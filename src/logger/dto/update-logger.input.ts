import { CreateLoggerInput } from './create-logger.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLoggerInput extends PartialType(CreateLoggerInput) {
  @Field(() => Int)
  id: number;
}
