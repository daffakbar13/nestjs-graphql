import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { JwtAuthGuard, PermissionGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/auth/auth.service';
import { UserModel } from 'src/auth/entities/user.entity';
import { BrandPermission } from 'src/auth/permissions/enums/brand.enum';
import { ProductModel } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/products.service';
import { CurrentUser } from 'src/utils/current-user';
import { BrandService } from './brands.service';
import { ArgsBrand, CreateBrand, FilterBrand, UpdateBrand } from './dto/brand.dto';
import { Brand, BrandModel } from './entities/brand.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) { }

  @Query(() => BrandModel, { name: 'brands' })
  protected findAll(@Args() args: ArgsBrand): Promise<BrandModel> {
    return this.brandService.findAll(args.filter, args.options);
  }

  @UseGuards(PermissionGuard(BrandPermission.CreateBrand))
  @Mutation(() => BrandModel)
  protected async createBrand(
    @Args(CreateBrand.KEY) input: CreateBrand,
    @CurrentUser() token: string
  ) {
    return await this.brandService.create(input, token);
  }

  @Mutation(() => BrandModel)
  protected updateBrand(
    @Args(UpdateBrand.KEY) args: UpdateBrand,
    @CurrentUser() token: string
  ): Promise<BrandModel> {
    return this.brandService.update(args.filter, args, token);
  }

  @Mutation(() => BrandModel)
  protected async removeBrand(
    @Args(FilterBrand.KEY) args: FilterBrand,
    @CurrentUser() token: string
  ): Promise<BrandModel> {
    return await this.brandService.remove(args, token);
  }

  @ResolveField(() => ProductModel)
  protected products(@Parent() brand: Brand): Promise<ProductModel> {
    return this.productService.findAll({ i_brandId: brand.i_id })
  }

  @ResolveField(() => UserModel)
  protected createadBy(@Parent() brand: Brand): Promise<UserModel> {
    return this.userService.findAll({ i_id: brand.i_createdByUserId })
  }

  @ResolveField(() => UserModel)
  protected updatedBy(@Parent() brand: Brand): Promise<UserModel> {
    return this.userService.findAll({ i_id: brand.i_updatedByUserId })
  }

  @ResolveField(() => UserModel)
  protected deletedBy(@Parent() brand: Brand): Promise<UserModel> {
    return this.userService.findAll({ i_id: brand.i_deletedByUserId })
  }
}
