import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOwnerInput } from './createOwner.input';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {}
