import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { CreateProductInput, FindProduct, LimitProduct, UpdateProductInput } from './dto/product.dto';
import { CreateProductStatusInput, FindProductStatus, LimitProductStatus, UpdateProductStatusInput } from './dto/productStatus.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from './entities/product_status.entity';
import { ProductRepository, ProductStatusRepository } from './products.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) { }
  public create(createProductInput: CreateProductInput): Promise<Product> {
    return this.productRepository.create(createProductInput);
  }

  public findAll(limitProduct: LimitProduct, findProduct: FindProduct): Promise<{ count: number; rows: Product[] }> {
    if (limitProduct == null) {
      limitProduct = {}

    }
    if (findProduct == null) {
      findProduct = {}
    }

    return this.productRepository.findAll(limitProduct, findProduct as WhereOptions)
  }

  public async update(updateProductInput: UpdateProductInput): Promise<void> {
    await this.productRepository.update(updateProductInput);
  }

  public async remove(findProduct: FindProduct): Promise<void> {
    await this.productRepository.remove(findProduct);
  }
}

@Injectable()
export class ProductStatusService {
  constructor(private productStatusRepository: ProductStatusRepository) { }
  public create(createProductStatusInput: CreateProductStatusInput): Promise<ProductStatus> {
    return this.productStatusRepository.create(createProductStatusInput);
  }

  public findAll(limitProductStatus: LimitProductStatus, findProductStatus: FindProductStatus): Promise<{ count: number; rows: ProductStatus[] }> {
    if (limitProductStatus == null) {
      limitProductStatus = {}

    }
    if (findProductStatus == null) {
      findProductStatus = {}
    }

    return this.productStatusRepository.findAll(limitProductStatus, findProductStatus as WhereOptions)
  }

  public async update(updateProductStatusInput: UpdateProductStatusInput): Promise<void> {
    await this.productStatusRepository.update(updateProductStatusInput);
  }

  public async remove(findProductStatus: FindProductStatus): Promise<void> {
    await this.productStatusRepository.remove(findProductStatus);
  }
}
