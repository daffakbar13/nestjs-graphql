import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService, ProductStatusService } from './products.service';
import { BrandService } from 'src/brands/brands.service';
import { CreateProductInput, FindProduct, LimitProduct, UpdateProductInput } from './dto/product.dto';
import { Product, ProductModel } from './entities/product.entity';
import { BrandModel } from 'src/brands/entities/brand.entity';
import { ProductStatus, ProductStatusModel } from './entities/product_status.entity';
import { CreateProductStatusInput, UpdateProductStatusInput } from './dto/productStatus.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Product)
@UseGuards(JwtAuthGuard)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly productStatusService: ProductStatusService
  ) { }

  @Mutation(() => ProductModel)
  private async createProduct(
    @Args(CreateProductInput.KEY) createProductInput: CreateProductInput
  ): Promise<ProductModel> {
    const product = await this.productService.create(createProductInput)

    return this.productService.findAll(null, { i_id: product.i_id })
  }

  @Query(() => ProductModel, { name: 'product' })
  private findAll(
    @Args(LimitProduct.KEY) limitProduct: LimitProduct,
    @Args(FindProduct.KEY) findProduct: FindProduct
  ): Promise<ProductModel> {
    return this.productService.findAll(limitProduct, findProduct);
  }

  @ResolveField(() => BrandModel)
  private async brand(
    @Parent() product: Product
  ): Promise<BrandModel> {
    return this.brandService.findAll(null, { i_id: product.i_brands_id })
  }

  @ResolveField(() => ProductStatusModel)
  private status(
    @Parent() product: Product
  ): Promise<ProductStatusModel> {
    return this.productStatusService.findAll(null, { i_id: product.i_product_status_id })
  }

  @Mutation(() => ProductModel)
  private async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput
  ): Promise<ProductModel> {
    await this.productService.update(updateProductInput)
    return await this.productService.findAll(null, { i_id: updateProductInput.id })
  }

  @Mutation(() => ProductModel)
  private async removeProduct(
    @Args('id') id: number
  ): Promise<ProductModel> {
    const result = await this.productService.findAll(null, { i_id: id })

    await this.productService.remove({ i_id: id });

    return result
  }
}

@Resolver(() => ProductStatus)
export class ProductStatusResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly productStatusService: ProductStatusService
  ) { }

  @Mutation(() => ProductStatusModel)
  private async createProductStatus(
    @Args(CreateProductStatusInput.KEY) createProductStatusInput: CreateProductStatusInput
  ): Promise<ProductStatusModel> {
    const product = await this.productStatusService.create(createProductStatusInput)

    return this.productStatusService.findAll(null, { i_id: product.i_id })
  }

  @Query(() => ProductStatusModel, { name: 'productStatus' })
  private findAll(
    @Args(LimitProduct.KEY) limitProduct: LimitProduct,
    @Args(FindProduct.KEY) findProduct: FindProduct
  ): Promise<ProductStatusModel> {
    return this.productStatusService.findAll(limitProduct, findProduct);
  }

  @ResolveField(() => ProductModel)
  private async products(
    @Parent() productStatus: ProductStatus
  ): Promise<ProductModel> {
    return this.productService.findAll(null, { i_product_status_id: productStatus.i_id })
  }

  @Mutation(() => ProductStatusModel)
  private async updateProductStatus(
    @Args(UpdateProductStatusInput.KEY) updateProductStatusInput: UpdateProductStatusInput
  ): Promise<ProductStatusModel> {
    await this.productStatusService.update(updateProductStatusInput)
    return await this.productStatusService.findAll(null, { i_id: updateProductStatusInput.id })
  }

  @Mutation(() => ProductStatusModel)
  private async removeProductStatus(
    @Args('id') id: number
  ): Promise<ProductStatusModel> {
    const result = await this.productStatusService.findAll(null, { i_id: id })

    await this.productStatusService.remove({ i_id: id });

    return result
  }
}