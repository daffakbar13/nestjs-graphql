import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStatusSellingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
