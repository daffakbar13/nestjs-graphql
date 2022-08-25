import { Injectable } from '@nestjs/common';
import { CreateProduct, FilterProduct, UpdateProduct } from './dto/product.dto';
import { CreateProductStatus, FilterProductStatus, UpdateProductStatus } from './dto/product-status.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from './entities/product-status.entity';
import { ProductRepository, ProductStatusRepository } from './products.repository';
import { Options } from 'src/utils/options';
import { OptionsAuthorize } from 'src/utils/options-authorize';

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository
  ) { }

  public create(input: CreateProduct): Promise<Product> {
    return this.repository.create(input);
  }

  public findAll(filter?: FilterProduct, options?: Options): Promise<{ count: number; rows: Product[] }> {
    return this.repository.findAll(
      OptionsAuthorize(filter),
      OptionsAuthorize(options)
    )
  }

  public async update(updateProduct: UpdateProduct): Promise<void> {
    await this.repository.update(updateProduct);
  }

  public async remove(filter: FilterProduct): Promise<void> {
    await this.repository.remove(filter);
  }
}

@Injectable()
export class ProductStatusService {
  constructor(
    private readonly repository: ProductStatusRepository
  ) { }

  public create(input: CreateProductStatus): Promise<ProductStatus> {
    return this.repository.create(input);
  }

  public async findAll(options: Options, filter: FilterProductStatus): Promise<{ count: number; rows: ProductStatus[] }> {
    return this.repository.findAll(
      OptionsAuthorize(filter),
      OptionsAuthorize(options)
    )
  }

  public async update(input: UpdateProductStatus): Promise<void> {
    await this.repository.update(input);
  }

  public async remove(filter: FilterProductStatus): Promise<void> {
    await this.repository.remove(filter);
  }
}
