import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleOwnerStrategy } from 'src/commons/auth/jwt-social-google-owner.strategy';
import { JwtKakaoOwnerStrategy } from 'src/commons/auth/jwt-social-kakao-owner.strategy';
import { JwtNaverOwnerStrategy } from 'src/commons/auth/jwt-social-naver-owner.strategy';
import { Owner } from '../owner/entities/owner.entity';
import { OwnerService } from '../owner/owner.service';
import { OwnerAuthController } from './owner.auth.controller';
import { OwnerAuthResolver } from './owner.auth.resolver';
import { OwnerAuthService } from './owner.auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([Owner]),
  ],
  providers: [
    JwtRefreshStrategy,
    JwtGoogleOwnerStrategy,
    JwtNaverOwnerStrategy,
    JwtKakaoOwnerStrategy,
    OwnerAuthResolver, //
    OwnerAuthService,
    OwnerService,
  ],
  controllers: [
    OwnerAuthController, //
  ],
})
export class OwnerAuthModule {}
