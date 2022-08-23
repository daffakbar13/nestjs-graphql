import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LoggerService } from './logger.service';
import { Logger } from './entities/logger.entity';
import { CreateLoggerInput } from './dto/create-logger.input';
import { UpdateLoggerInput } from './dto/update-logger.input';

@Resolver(() => Logger)
export class LoggerResolver {
  constructor(private readonly loggerService: LoggerService) {}

  @Mutation(() => Logger)
  createLogger(@Args('createLoggerInput') createLoggerInput: CreateLoggerInput) {
    return this.loggerService.create(createLoggerInput);
  }

  @Query(() => [Logger], { name: 'logger' })
  findAll() {
    return this.loggerService.findAll();
  }

  @Query(() => Logger, { name: 'logger' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.loggerService.findOne(id);
  }

  @Mutation(() => Logger)
  updateLogger(@Args('updateLoggerInput') updateLoggerInput: UpdateLoggerInput) {
    return this.loggerService.update(updateLoggerInput.id, updateLoggerInput);
  }

  @Mutation(() => Logger)
  removeLogger(@Args('id', { type: () => Int }) id: number) {
    return this.loggerService.remove(id);
  }
}
