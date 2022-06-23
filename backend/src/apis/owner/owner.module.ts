import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { OwnerResolver } from './owner.resolver';
import { OwnerService } from './owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  providers: [
    OwnerResolver,
    OwnerService, //
  ],
})
export class OwnerModule {}
