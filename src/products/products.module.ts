import { Module } from '@nestjs/common';
import { ProductService, ProductStatusService } from './products.service';
import { ProductResolver, ProductStatusResolver } from './products.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { BrandsModule } from 'src/brands/brands.module';
import { ProductRepository, ProductStatusRepository } from './products.repository';
import { ProductStatus } from './entities/product-status.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, ProductStatus]),
    AuthModule,
    BrandsModule
  ],
  providers: [
    ProductResolver,
    ProductStatusResolver,
    ProductService,
    ProductStatusService,
    ProductRepository,
    ProductStatusRepository,
  ],
  exports: [ProductService]
})
export class ProductsModule { }
