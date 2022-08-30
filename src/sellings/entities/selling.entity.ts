import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Selling {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
