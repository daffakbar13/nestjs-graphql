import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService, ProductStatusService } from './products.service';
import { BrandService } from 'src/brands/brands.service';
import { ArgsProduct, CreateProduct, UpdateProduct } from './dto/product.dto';
import { Product, ProductModel } from './entities/product.entity';
import { BrandModel } from 'src/brands/entities/brand.entity';
import { ProductStatus, ProductStatusModel } from './entities/product-status.entity';
import { ArgsProductStatus, CreateProductStatus, UpdateProductStatus } from './dto/product-status.dto';
import { Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/utils/current-user';
import { User } from 'src/users/entities/user.entity';
import { request } from 'http';
import { AuthService } from 'src/auth/auth.service';
@UseGuards(JwtAuthGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly productStatusService: ProductStatusService,
  ) { }

  @Mutation(() => ProductModel)
  protected async createProduct(
    @Args(CreateProduct.KEY) input: CreateProduct,
    @CurrentUser() token: string
  ): Promise<ProductModel> {
    return await this.productService.create(input, token)
  }

  @Query(() => ProductModel, { name: 'product' })
  protected async findAll(@Args() args: ArgsProduct): Promise<ProductModel> {
    return this.productService.findAll(args.filter, args.options);
  }

  @ResolveField(() => BrandModel)
  protected brand(@Parent() product: Product): Promise<BrandModel> {
    return this.brandService.findAll({ i_id: product.i_brandId })
  }

  @ResolveField(() => ProductStatusModel)
  protected status(@Parent() product: Product): Promise<ProductStatusModel> {
    return this.productStatusService.findAll(null, { i_id: product.i_productStatusId })
  }

  @Mutation(() => ProductModel)
  protected async updateProduct(
    @Args(UpdateProduct.KEY) input: UpdateProduct,
    @CurrentUser() token: string
  ): Promise<ProductModel> {
    return await this.productService.update(input, token)
  }

  @Mutation(() => ProductModel)
  protected async removeProduct(
    @Args('id') id: number,
    @CurrentUser() token: string
  ): Promise<ProductModel> {
    const result = await this.productService.findAll({ i_id: id })
    await this.productService.remove({ i_id: id }, token);
    return result
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
    const product = await this.productStatusService.create(input)
    return this.productStatusService.findAll(null, { i_id: product.i_id })
  }

  @Query(() => ProductStatusModel, { name: 'productStatus' })
  protected findAll(
    @Args() args: ArgsProductStatus
  ): Promise<ProductStatusModel> {
    return this.productStatusService.findAll(args.options, args.filter);
  }

  @ResolveField(() => ProductModel)
  protected async products(@Parent() productStatus: ProductStatus): Promise<ProductModel> {
    return this.productService.findAll({ i_productStatusId: productStatus.i_id })
  }

  @Mutation(() => ProductStatusModel)
  protected async updateProductStatus(@Args(UpdateProductStatus.KEY) input: UpdateProductStatus): Promise<ProductStatusModel> {
    await this.productStatusService.update(input)
    return await this.productStatusService.findAll(null, { i_id: input.id })
  }

  @Mutation(() => ProductStatusModel)
  protected async removeProductStatus(@Args('id') id: number): Promise<ProductStatusModel> {
    const result = await this.productStatusService.findAll(null, { i_id: id })
    await this.productStatusService.remove({ i_id: id });
    return result
  }
}