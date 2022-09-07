import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService, ProductStatusService } from './products.service';
import { BrandService } from 'src/brands/brands.service';
import { ArgsProduct, CreateProduct, FilterProduct, UpdateProduct } from './dto/product.dto';
import { Product, ProductModel } from './entities/product.entity';
import { BrandModel } from 'src/brands/entities/brand.entity';
import { ProductStatus, ProductStatusModel } from './entities/product-status.entity';
import { ArgsProductStatus, CreateProductStatus, UpdateProductStatus } from './dto/product-status.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/utils/current-user';
import { UserModel } from 'src/auth/entities/user.entity';
import { UserService } from 'src/auth/auth.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly productStatusService: ProductStatusService,
    private readonly userService: UserService
  ) { }

  @Query(() => ProductModel, { name: 'product' })
  protected async findAll(@Args() args: ArgsProduct): Promise<ProductModel> {
    return this.productService.findAll(args.filter, args.options);
  }

  @Mutation(() => ProductModel)
  protected async createProduct(
    @Args(CreateProduct.KEY) input: CreateProduct,
    @CurrentUser() token: string
  ): Promise<ProductModel> {
    return await this.productService.create(input, token)
  }

  @Mutation(() => ProductModel)
  protected async updateProduct(
    @Args(UpdateProduct.KEY) args: UpdateProduct,
    @CurrentUser() token: string
  ): Promise<ProductModel> {
    return await this.productService.update(args.filter, args, token)
  }

  @Mutation(() => ProductModel)
  protected async removeProduct(
    @Args(FilterProduct.KEY) args: FilterProduct,
    @CurrentUser() token: string
  ): Promise<ProductModel> {
    return await this.productService.remove(args, token);
  }

  @ResolveField(() => BrandModel)
  protected brand(@Parent() product: Product): Promise<BrandModel> {
    return this.brandService.findAll({ i_id: product.i_brandId })
  }

  @ResolveField(() => ProductStatusModel)
  protected status(@Parent() product: Product): Promise<ProductStatusModel> {
    return this.productStatusService.findAll({ i_id: product.i_productStatusId })
  }

  @ResolveField(() => UserModel)
  protected createadBy(@Parent() product: Product): Promise<UserModel> {
    return this.userService.findAll({ i_id: product.i_createdByUserId })
  }

  @ResolveField(() => UserModel)
  protected updatedBy(@Parent() product: Product): Promise<UserModel> {
    return this.userService.findAll({ i_id: product.i_updatedByUserId })
  }

  @ResolveField(() => UserModel)
  protected deletedBy(@Parent() product: Product): Promise<UserModel> {
    return this.userService.findAll({ i_id: product.i_deletedByUserId })
  }
}
@UseGuards(JwtAuthGuard)
@Resolver(() => ProductStatus)
export class ProductStatusResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly productStatusService: ProductStatusService
  ) { }

  @Mutation(() => ProductStatusModel)
  protected async createProductStatus(@Args(CreateProductStatus.KEY) input: CreateProductStatus): Promise<ProductStatusModel> {
    return await this.productStatusService.create(input)
  }

  @Query(() => ProductStatusModel, { name: 'productStatus' })
  protected findAll(
    @Args() args: ArgsProductStatus
  ): Promise<ProductStatusModel> {
    return this.productStatusService.findAll(args.filter, args.options);
  }

  @ResolveField(() => ProductModel)
  protected async products(@Parent() productStatus: ProductStatus): Promise<ProductModel> {
    return this.productService.findAll({ i_productStatusId: productStatus.i_id })
  }

  @Mutation(() => ProductStatusModel)
  protected async updateProductStatus(@Args(UpdateProductStatus.KEY) input: UpdateProductStatus): Promise<ProductStatusModel> {
    return await this.productStatusService.update(input)
  }

  @Mutation(() => ProductStatusModel)
  protected async removeProductStatus(@Args('id') id: number): Promise<ProductStatusModel> {
    return await this.productStatusService.remove({ i_id: id });
  }
}