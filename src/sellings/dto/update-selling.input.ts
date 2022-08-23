import { CreateSellingInput } from './create-selling.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSellingInput extends PartialType(CreateSellingInput) {
  @Field(() => Int)
  id: number;
}
