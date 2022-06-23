import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;

  @Field(() => Int, { nullable: true })
  likeCount: number;

  @Field(() => Int, { nullable: true })
  dislikeCount: number;

  @Field(() => Int, { nullable: true })
  hitCount: number;

  @Field(() => Date, { nullable: true })
  updateDate: Date;

  @Field(() => String)
  boardId: string;

  @Field(() => String)
  storeId: string;

  @Field(() => String)
  foodTypeId: string;

  @Field(() => String)
  userId: string;

  @Field(() => [String])
  tags: string[];
}
