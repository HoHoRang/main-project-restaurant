import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoreInput {
  @Field(() => String)
  storeName: string;

  @Field(() => String)
  address: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => String)
  category: string;

  @Field(() => String)
  ownerId: string;
}
