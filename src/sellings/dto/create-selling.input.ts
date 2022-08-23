import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSellingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
