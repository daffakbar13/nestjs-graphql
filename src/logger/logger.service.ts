import { Injectable } from '@nestjs/common';
import { CreateLoggerInput } from './dto/create-logger.input';
import { UpdateLoggerInput } from './dto/update-logger.input';

@Injectable()
export class LoggerService {
  create(createLoggerInput: CreateLoggerInput) {
    return 'This action adds a new logger';
  }

  findAll() {
    return `This action returns all logger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logger`;
  }

  update(id: number, updateLoggerInput: UpdateLoggerInput) {
    return `This action updates a #${id} logger`;
  }

  remove(id: number) {
    return `This action removes a #${id} logger`;
  }
}
