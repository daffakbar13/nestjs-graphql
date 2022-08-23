import { Injectable } from '@nestjs/common';
import { CreateSellingInput } from './dto/create-selling.input';
import { UpdateSellingInput } from './dto/update-selling.input';

@Injectable()
export class SellingsService {
  create(createSellingInput: CreateSellingInput) {
    return 'This action adds a new selling';
  }

  findAll() {
    return `This action returns all sellings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selling`;
  }

  update(id: number, updateSellingInput: UpdateSellingInput) {
    return `This action updates a #${id} selling`;
  }

  remove(id: number) {
    return `This action removes a #${id} selling`;
  }
}
