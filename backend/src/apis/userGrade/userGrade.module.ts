import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGrade } from './entities/userGrade.entity';
import { UserGradeResolver } from './userGrade.resolver';
import { UserGradeService } from './userGrade.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserGrade])],
  providers: [
    UserGradeResolver,
    UserGradeService, //
  ],
})
export class UserGradeModule {}
