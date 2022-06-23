import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  loginId: string;

  @Field(() => String, { nullable: true })
  rrn: string;

  @Field(() => String, { nullable: true })
  nickname: string;

  @Field(() => String, { nullable: true, defaultValue: 'SITE' })
  provider: string;

  @Field(() => String, { nullable: true })
  userGradeId: string;
}
