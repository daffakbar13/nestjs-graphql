import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { AuthService } from 'src/auth/auth.service';
import { ProductService } from 'src/products/products.service';
import { Modify, Options } from 'src/utils/options';
import { BrandRepository } from './brands.repository';
import { CreateBrand, FilterBrand, UpdateBrand } from './dto/brand.dto';
import { BrandModel } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    private readonly repository: BrandRepository,
    private readonly productService: ProductService,
    private readonly authService: AuthService
  ) { }

  public async create(input: CreateBrand, token: string): Promise<BrandModel> {
    const user = await this.authService.getUserByToken(token)
    console.log(Modify({ access: 'create', user }));

    return this.repository.create({ ...input, ...Modify({ access: 'create', user }) });
  }

  public async findAll(filter: FilterBrand, options?: Options): Promise<BrandModel> {
    return this.repository.findAll(filter as WhereOptions, options)
  }

  public async update(input: UpdateBrand, token: string): Promise<BrandModel> {
    const user = await this.authService.getUserByToken(token)

    return this.repository.update(input, user);
  }

  public async remove(filter: FilterBrand, token: string): Promise<BrandModel> {
    const user = await this.authService.getUserByToken(token)
    const deleted = await this.repository.remove(filter as WhereOptions, user);
    if (deleted.count !== 0) {
      const id = deleted.rows[0].i_id
      await this.productService.remove({ i_brandId: id }, token)

    }

    return deleted
  }
}
