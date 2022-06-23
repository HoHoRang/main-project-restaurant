import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStoreInput } from './createStore.input';

@InputType()
export class UpdateStoreInput extends PartialType(CreateStoreInput) {}
