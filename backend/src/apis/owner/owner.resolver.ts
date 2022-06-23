import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { CreateOwnerInput } from './dto/createOwner.input';
import { UpdateOwnerInput } from './dto/updateOwner.input';

import { Owner } from './entities/owner.entity';
import { OwnerService } from './owner.service';

@Resolver()
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Query(() => [Owner])
  fetchOwners() {
    return this.ownerService.findAll();
  }

  @Query(() => [Owner])
  fetchOwnersWithDeleted() {
    return this.ownerService.findAllWithDeleted();
  }

  @Query(() => Owner)
  async fetchOwner(@Args('ownerId') ownerId: string) {
    await this.ownerService.checkExist({ ownerId });

    return await this.ownerService.findOne({ ownerId });
  }

  @Mutation(() => Owner)
  createOwner(
    @Args('createOwnerInput') createOwnerInput: CreateOwnerInput, //
  ) {
    return this.ownerService.create({ createOwnerInput });
  }

  @Mutation(() => Owner)
  async updateOwner(
    @Args('ownerId') ownerId: string,
    @Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput,
  ) {
    // 존재하는 회원인지 확인
    await this.ownerService.checkExist({ ownerId });
    // 수정하기
    return await this.ownerService.update({
      ownerId,
      updateOwnerInput,
    });
  }

  @Mutation(() => Boolean)
  async deleteOwner(
    @Args('ownerId') ownerId: string, //
  ) {
    return await this.ownerService.delete({ ownerId });
  }

  @Mutation(() => Boolean)
  async restoreOwner(
    @Args('ownerId') ownerId: string, //
  ) {
    return await this.ownerService.restore({ ownerId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Owner)
  async updateLoginOwnerPassword(
    @Args('updatePassword') updatePassword: string,
    @CurrentUser() currentUser: any,
  ) {
    return await this.ownerService.updatePassword({
      ownerId: currentUser.id,
      updatePassword,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Owner)
  async fetchLoginOwner(@CurrentUser() currentUser: any) {
    return await this.ownerService.findOne({ ownerId: currentUser.id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteLoginOwner(@CurrentUser() currentUser: any) {
    return await this.ownerService.delete({ ownerId: currentUser.id });
  }
}
