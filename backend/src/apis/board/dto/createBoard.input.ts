import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  boardName: string;

  @Field(() => String)
  description: string;
}
