import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerResolver } from './logger.resolver';

@Module({
  providers: [LoggerResolver, LoggerService]
})
export class LoggerModule {}
