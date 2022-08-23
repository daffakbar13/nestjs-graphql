import { Module } from '@nestjs/common';
import { SellingsService } from './sellings.service';
import { SellingsResolver } from './sellings.resolver';

@Module({
  providers: [SellingsResolver, SellingsService]
})
export class SellingsModule {}
