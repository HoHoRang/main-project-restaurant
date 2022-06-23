import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { PostImageService } from './postImage.service';

@Resolver()
export class PostImageResolver {
  constructor(
    private readonly postImageService: PostImageService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  createImages(
    @Args('postId') postId: string, //
    @Args({ name: 'urls', type: () => [String] }) urls: string[],
  ) {
    return this.postImageService.create({ postId, urls });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  updateImages(
    @Args('postId') postId: string, //
    @Args({ name: 'urls', type: () => [String] }) urls: string[],
  ) {
    return this.postImageService.update({ postId, urls });
  }
}
