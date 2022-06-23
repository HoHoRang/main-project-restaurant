import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;
}
