import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CreateProductInput, FindProduct, LimitProduct, UpdateProductInput } from "./dto/product.dto";
import { CreateProductStatusInput, UpdateProductStatusInput } from "./dto/productStatus.dto";
import { Product } from "./entities/product.entity";
import { ProductStatus } from "./entities/product_status.entity";

export class ProductRepository {
    @InjectModel(Product)
    private product: typeof Product

    private async findOne(findProduct: FindProduct) {
        const result = await this.product.findOne({
            where: findProduct as WhereOptions
        });
        if (!result) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public create(createProductInput: CreateProductInput): Promise<Product> {
        return this.product.create(createProductInput as any);
    }

    public findAll(limitProduct: LimitProduct, findProduct: WhereOptions): Promise<{ count: number; rows: Product[] }> {
        return this.product.findAndCountAll({
            where: findProduct,
            offset: limitProduct.offset,
            limit: limitProduct.limit
        });
    }

    public async update(updateProductInput: UpdateProductInput): Promise<void> {
        await this.findOne({ i_id: updateProductInput.id })
        await this.product.update(updateProductInput, { where: { i_id: updateProductInput.id } });
    }

    public async remove(findProduct: FindProduct): Promise<void> {
        await this.findOne(findProduct)
        await this.product.destroy(
            { where: findProduct as WhereOptions }
        );
    }

}

export class ProductStatusRepository {
    @InjectModel(ProductStatus)
    private productStatus: typeof ProductStatus

    private async findOne(findProduct: FindProduct) {
        const result = await this.productStatus.findOne({
            where: findProduct as WhereOptions
        });
        if (!result) {
            throw new HttpException('Product status not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public create(createProductStatusInput: CreateProductStatusInput): Promise<ProductStatus> {
        return this.productStatus.create(createProductStatusInput as any);
    }

    public findAll(limitProduct: LimitProduct, findProduct: WhereOptions): Promise<{ count: number; rows: ProductStatus[] }> {
        return this.productStatus.findAndCountAll({
            where: findProduct,
            offset: limitProduct.offset,
            limit: limitProduct.limit
        });
    }

    public async update(updateProductStatusInput: UpdateProductStatusInput): Promise<void> {
        await this.findOne({ i_id: updateProductStatusInput.id })
        await this.productStatus.update(updateProductStatusInput, { where: { i_id: updateProductStatusInput.id } });
    }

    public async remove(findProduct: FindProduct): Promise<void> {
        await this.findOne(findProduct)
        await this.productStatus.destroy(
            { where: findProduct as WhereOptions }
        );
    }

}