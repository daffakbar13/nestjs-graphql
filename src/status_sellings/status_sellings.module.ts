import { Module } from '@nestjs/common';
import { StatusSellingsService } from './status_sellings.service';
import { StatusSellingsResolver } from './status_sellings.resolver';

@Module({
  providers: [StatusSellingsResolver, StatusSellingsService]
})
export class StatusSellingsModule {}
