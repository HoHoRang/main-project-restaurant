import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGrade } from './entities/userGrade.entity';
import { UserGradeService } from './userGrade.service';

@Resolver()
export class UserGradeResolver {
  constructor(private readonly userGradeService: UserGradeService) {}

  @Query(() => [UserGrade])
  fetchUserGrades() {
    return this.userGradeService.findAll();
  }

  @Query(() => [UserGrade])
  fetchUserGradesWithDeleted() {
    return this.userGradeService.findAllWithDeleted();
  }

  @Query(() => UserGrade)
  async fetchUserGrade(@Args('userGradeId') userGradeId: string) {
    await this.userGradeService.checkExist({ userGradeId });

    return await this.userGradeService.findOne({ userGradeId });
  }

  @Mutation(() => UserGrade)
  createUserGrade(
    @Args('gradeName') gradeName: string, //
  ) {
    return this.userGradeService.create({ gradeName });
  }

  @Mutation(() => UserGrade)
  async updateUserGrade(
    @Args('userGradeId') userGradeId: string,
    @Args('gradeName') gradeName: string,
  ) {
    // 존재하는지 확인
    await this.userGradeService.checkExist({ userGradeId });
    // 수정하기
    return await this.userGradeService.update({
      userGradeId,
      gradeName,
    });
  }

  @Mutation(() => Boolean)
  async deleteUserGrade(
    @Args('userGradeId') userGradeId: string, //
  ) {
    return await this.userGradeService.delete({ userGradeId });
  }

  @Mutation(() => Boolean)
  async restoreUserGrade(
    @Args('userGradeId') userGradeId: string, //
  ) {
    return await this.userGradeService.restore({ userGradeId });
  }
}
