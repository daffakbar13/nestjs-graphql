import { Inject, Injectable, Request } from '@nestjs/common';
import { CreateProduct, FilterProduct, UpdateProduct } from './dto/product.dto';
import { CreateProductStatus, FilterProductStatus, UpdateProductStatus } from './dto/product-status.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from './entities/product-status.entity';
import { ProductRepository, ProductStatusRepository } from './products.repository';
import { Options } from 'src/utils/options';
import { AuthService } from 'src/auth/auth.service';
import { WhereOptions } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly authService: AuthService
  ) { }

  public async create(input: CreateProduct, token: string): Promise<{ count: number; rows: Product[] }> {
    const user = await this.authService.getUserByToken(token)
    return await this.repository.create(input, user);
  }

  public async findAll(filter?: FilterProduct, options?: Options): Promise<{ count: number; rows: Product[] }> {
    return this.repository.findAll(filter as WhereOptions, options)
  }

  public async update(input: UpdateProduct, token: string): Promise<{ count: number; rows: Product[] }> {
    const user = await this.authService.getUserByToken(token)
    return await this.repository.update(input, user);
  }

  public async remove(filter: FilterProduct, token: string): Promise<{ count: number; rows: Product[] }> {
    const user = await this.authService.getUserByToken(token)
    return await this.repository.remove(filter as WhereOptions, user);
  }
}

@Injectable()
export class ProductStatusService {
  constructor(
    private readonly repository: ProductStatusRepository
  ) { }

  public async create(input: CreateProductStatus): Promise<{ count: number; rows: ProductStatus[] }> {
    return await this.repository.create(input);
  }

  public async findAll(filter: FilterProductStatus, options?: Options): Promise<{ count: number; rows: ProductStatus[] }> {
    return this.repository.findAll(filter as WhereOptions, options)
  }

  public async update(input: UpdateProductStatus): Promise<{ count: number; rows: ProductStatus[] }> {
    return await this.repository.update(input);
  }

  public async remove(filter: FilterProductStatus): Promise<{ count: number; rows: ProductStatus[] }> {
    return await this.repository.remove(filter as WhereOptions);
  }
}
