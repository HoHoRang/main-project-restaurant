import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnerAuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  setRefreshToken({ owner, res }) {
    const refreshToken = this.jwtService.sign(
      { email: owner.email, sub: owner.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

    // 배포환경
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=localhost; SameSite=None; Secure; httpOnly;`,
    // );
  }

  getAccessToken({ owner }) {
    return this.jwtService.sign(
      { email: owner.email, sub: owner.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
