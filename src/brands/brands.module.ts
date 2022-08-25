import { forwardRef, Module } from '@nestjs/common';
import { BrandService } from './brands.service';
import { BrandResolver } from './brands.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from './brands.repository';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Brand]),
    forwardRef(() => ProductsModule),
    AuthModule
  ],
  providers: [BrandResolver, BrandService, BrandRepository],
  exports: [BrandService]
})
export class BrandsModule { }
