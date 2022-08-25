import { Injectable } from '@nestjs/common';
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
    private readonly productService: ProductService
  ) { }

  public create(input: CreateBrand): Promise<Brand> {
    return this.repository.create(input);
  }

  public async findAll(filter: FilterBrand, options?: Options): Promise<{ count: number; rows: Brand[] }> {
    return await this.repository.findAll(
      OptionsAuthorize(options),
      OptionsAuthorize(filter)
    )
  }

  public async update(input: UpdateBrand): Promise<void> {
    await this.repository.update(input);
  }

  public async remove(filter: FilterBrand): Promise<void> {
    await this.productService.remove({ i_brands_id: filter.i_id })
    await this.repository.remove(
      OptionsAuthorize(filter)
    );
  }
}
