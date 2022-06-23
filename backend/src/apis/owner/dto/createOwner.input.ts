import { Field, InputType } from '@nestjs/graphql';
import { SUBSCRIBE_STATUS_ENUM } from '../entities/owner.entity';

@InputType()
export class CreateOwnerInput {
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

  @Field(() => SUBSCRIBE_STATUS_ENUM, { nullable: true })
  subscribeStatus: string;
}
