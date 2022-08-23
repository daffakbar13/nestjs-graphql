import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { ProductModel } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/products.service';
import { BrandService } from './brands.service';
import { CreateBrandInput, FindBrand, LimitBrand, UpdateBrandInput } from './dto/brand.dto';
import { Brand, BrandModel } from './entities/brand.entity';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly productService: ProductService
  ) { }

  @Mutation(() => BrandModel)
  private async createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    const brand = await this.brandService.create(createBrandInput);
    return this.brandService.findAll(null, { i_id: brand.i_id })
  }

  @Query(() => BrandModel, { name: 'brands' })
  private findAll(
    @Args(LimitBrand.KEY) limitBrand: LimitBrand,
    @Args(FindBrand.KEY) findBrand: FindBrand
  ): Promise<BrandModel> {
    return this.brandService.findAll(limitBrand, findBrand);
  }

  @ResolveField(() => ProductModel)
  private async products(
    @Parent() brand: Brand
  ): Promise<ProductModel> {
    return this.productService.findAll(null, { i_brands_id: brand.i_id })
  }

  @Mutation(() => BrandModel)
  private async updateBrand(
    @Args(UpdateBrandInput.KEY) updateBrandInput: UpdateBrandInput
  ): Promise<BrandModel> {
    await this.brandService.update(updateBrandInput);
    return this.brandService.findAll(null, { i_id: updateBrandInput.id })
  }

  @Mutation(() => BrandModel)
  private async removeBrand(
    @Args('id') id: number
  ): Promise<BrandModel> {
    const result = await this.brandService.findAll(null, { i_id: id })

    await this.productService.remove(
      { i_brands_id: id }
    )
    await this.brandService.remove(
      { i_id: id }
    );

    return result
  }
}
