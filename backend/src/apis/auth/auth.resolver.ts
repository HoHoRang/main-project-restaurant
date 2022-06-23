import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string, //
    @Context() context: any,
  ) {
    // 1. 로그인(이메일과 비밀번호가 일치하는 유저 찾기)
    const user = await this.userService.findOneByEmail({
      email,
      provider: 'SITE',
    });
    // 2. 일치하는 유저가 없으면? 에러
    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 이메일입니다.');

    // 3. 일치하는 유저가 있지만, 암호가 틀렸다면? 에러
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    // 5. accessToken(=JWT) 만들어서 프론트엔드에 보내주기
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: any) {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );

    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);

    try {
      const verifyAccess = jwt.verify(accessToken, 'myAccessKey');
      const verifyRefresh = jwt.verify(refreshToken, 'myRefreshKey');

      console.log(
        'Verify accessToken: ',
        verifyAccess,
        verifyAccess['exp'] - verifyAccess['iat'],
      );
      console.log(
        'Verify refreshToken: ',
        verifyRefresh,
        verifyRefresh['exp'] - verifyRefresh['iat'],
      );

      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: verifyAccess['exp'] - verifyAccess['iat'],
      });

      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: verifyRefresh['exp'] - verifyRefresh['iat'],
        },
      );
    } catch (error) {
      throw new UnauthorizedException('검증되지 않은 토큰입니다!');
    }

    return '로그아웃에 성공했습니다!';
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: ICurrentUser) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
