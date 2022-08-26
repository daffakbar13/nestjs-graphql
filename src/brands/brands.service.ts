import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ProductService } from 'src/products/products.service';
import { Options } from 'src/utils/options';
import { OptionsAuthorize } from 'src/utils/options-authorize';
import { BrandRepository } from './brands.repository';
import { CreateBrand, FilterBrand, UpdateBrand } from './dto/brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    private readonly repository: BrandRepository,
    private readonly productService: ProductService,
    private readonly authService: AuthService
  ) { }

  public async create(input: CreateBrand, token: string): Promise<{ count: number; rows: Brand[] }> {
    const user = await this.authService.getUserByToken(token)
    return await this.repository.create(input, user);
  }

  public async findAll(filter: FilterBrand, options?: Options): Promise<{ count: number; rows: Brand[] }> {
    return await this.repository.findAll(
      OptionsAuthorize(filter),
      OptionsAuthorize(options)
    )
  }

  public async update(input: UpdateBrand, token: string): Promise<{ count: number; rows: Brand[] }> {
    const user = (await this.authService.getUserByToken(token))

    return await this.repository.update(input, user);
  }

  public async remove(filter: FilterBrand, token: string): Promise<{ count: number; rows: Brand[] }> {
    const user = await this.authService.getUserByToken(token)
    const deletedBrand = await this.repository.remove(
      OptionsAuthorize(filter),
      user
    );
    await this.productService.remove({ i_brandId: filter.i_id }, token)

    return deletedBrand
  }
}
