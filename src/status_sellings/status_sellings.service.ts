import { Injectable } from '@nestjs/common';
import { CreateStatusSellingInput } from './dto/create-status_selling.input';
import { UpdateStatusSellingInput } from './dto/update-status_selling.input';

@Injectable()
export class StatusSellingsService {
  create(createStatusSellingInput: CreateStatusSellingInput) {
    return 'This action adds a new statusSelling';
  }

  findAll() {
    return `This action returns all statusSellings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusSelling`;
  }

  update(id: number, updateStatusSellingInput: UpdateStatusSellingInput) {
    return `This action updates a #${id} statusSelling`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusSelling`;
  }
}
