import { Module } from '@nestjs/common';
import { SellingService } from './sellings.service';
import { SellingResolver } from './sellings.resolver';
import { SellingRepository } from './sellings.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Selling } from './entities/selling.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SellingProduct } from './entities/selling-product.entity';
import { SellingAddress } from './entities/selling-address.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Selling, SellingProduct, SellingAddress]),
    AuthModule
  ],
  providers: [SellingResolver, SellingService, SellingRepository],
})
export class SellingsModule { }
