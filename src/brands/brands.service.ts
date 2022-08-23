import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { BrandRepository } from './brands.repository';
import { CreateBrandInput, FindBrand, LimitBrand, UpdateBrandInput } from './dto/brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepository) { }
  create(createBrandInput: CreateBrandInput): Promise<Brand> {
    return this.brandRepository.create(createBrandInput);
  }

  public findAll(limitBrand: LimitBrand, findBrand: FindBrand): Promise<{ count: number; rows: Brand[] }> {
    if (limitBrand === null) {
      limitBrand = {}
    }
    if (findBrand === null) {
      findBrand = {}
    }
    return this.brandRepository.findAll(limitBrand, findBrand as WhereOptions)
  }

  public async update(updateBrandInput: UpdateBrandInput): Promise<void> {
    await this.brandRepository.update(updateBrandInput);
  }

  public async remove(findBrand: FindBrand): Promise<void> {
    await this.brandRepository.remove(findBrand);
  }
}
