import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ProductModel } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/products.service';
import { BrandService } from './brands.service';
import { ArgsBrand, CreateBrand, UpdateBrand } from './dto/brand.dto';
import { Brand, BrandModel } from './entities/brand.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly productService: ProductService
  ) { }

  @Mutation(() => BrandModel)
  protected async createBrand(@Args(CreateBrand.KEY) input: CreateBrand) {
    const brand = await this.brandService.create(input);
    return await this.brandService.findAll({ i_id: brand.i_id })
  }

  @Query(() => BrandModel, { name: 'brands' })
  protected findAll(@Args() args: ArgsBrand): Promise<BrandModel> {
    return this.brandService.findAll(args.filter, args.options);
  }

  @ResolveField(() => ProductModel)
  protected products(@Parent() brand: Brand): Promise<ProductModel> {
    return this.productService.findAll({ i_brands_id: brand.i_id })
  }

  @Mutation(() => BrandModel)
  protected async updateBrand(@Args(UpdateBrand.KEY) input: UpdateBrand): Promise<BrandModel> {
    await this.brandService.update(input);
    return this.brandService.findAll({ i_id: input.id })
  }

  @Mutation(() => BrandModel)
  protected async removeBrand(@Args('id') id: number): Promise<BrandModel> {
    const result = await this.brandService.findAll({ i_id: id })
    await this.productService.remove({ i_brands_id: id })
    await this.brandService.remove({ i_id: id });
    return result
  }
}
