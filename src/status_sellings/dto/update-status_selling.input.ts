import { CreateStatusSellingInput } from './create-status_selling.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStatusSellingInput extends PartialType(CreateStatusSellingInput) {
  @Field(() => Int)
  id: number;
}
