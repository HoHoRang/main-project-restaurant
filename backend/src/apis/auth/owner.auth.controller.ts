import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Owner } from '../owner/entities/owner.entity';
import { OwnerService } from '../owner/owner.service';
import { OwnerAuthService } from './owner.auth.service';

interface IOAuthOwner {
  owner: Pick<Owner, 'name' | 'email' | 'phone' | 'password'>;
}

@Controller()
export class OwnerAuthController {
  constructor(
    private readonly ownerService: OwnerService, //
    private readonly ownerAuthService: OwnerAuthService,
  ) {}

  @Get('/loginOwner/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthOwner, //
    @Res() res: Response,
  ) {
    this.checkOwnerAndRefreshToken({ req, res });
  }

  @Get('/loginOwner/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthOwner, //
    @Res() res: Response,
  ) {
    this.checkOwnerAndRefreshToken({ req, res });
  }

  @Get('/loginOwner/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthOwner, //
    @Res() res: Response,
  ) {
    this.checkOwnerAndRefreshToken({ req, res });
  }

  async checkOwnerAndRefreshToken({ req, res }) {
    // 1. 가입확인
    let owner = await this.ownerService.findOneByEmail({
      email: req.user.email,
      provider: req.user.provider,
    });

    // 2. 회원가입
    if (!owner) {
      const createOwnerInput = {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        password: req.user.password,
        provider: req.user.provider,
      };

      owner = await this.ownerService.create({ createOwnerInput });
    }

    // 3. 로그인
    this.ownerAuthService.setRefreshToken({ owner, res });

    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
