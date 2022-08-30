import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CreateProduct, UpdateProduct } from "./dto/product.dto";
import { UpdateProductStatus } from "./dto/product-status.dto";
import { Product } from "./entities/product.entity";
import { ProductStatus } from "./entities/product-status.entity";
import { Options } from "src/utils/options";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { User } from "src/auth/entities/user.entity";
import { OptionsAuthorize } from "src/utils/options-authorize";

export class ProductRepository {
    @InjectModel(Product)
    private product: typeof Product

    private async validate(filter: WhereOptions): Promise<boolean> {
        const result = await this.product.findOne({ where: filter });
        CheckAvailibility(result, 'Product not found!')
        return true;
    }

    public async create(input: CreateProduct, user: User): Promise<{ count: number; rows: Product[] }> {
        const { i_brandId, i_productStatusId, n_photo, n_price, n_product, n_stock } = input
        const data: CreateProduct = {
            i_createdByUserId: user.i_id,
            i_updatedByUserId: user.i_id,
            i_brandId,
            i_productStatusId,
            n_photo,
            n_price,
            n_product,
            n_stock,
        }
        const newProduct = await this.product.create(data as any);

        return this.findAll({ i_id: newProduct.i_id })
    }

    public findAll(filter?: WhereOptions, options?: Options): Promise<{ count: number; rows: Product[] }> {
        // const { limit, offset } = options
        OptionsAuthorize
        return this.product.findAndCountAll({
            where: filter,
            limit: options?.limit,
            offset: options?.offset
        });
    }

    public async update(input: UpdateProduct, user: User): Promise<{ count: number; rows: Product[] }> {
        const { id, i_brandId, i_productStatusId, n_photo, n_price, n_product, n_stock } = input
        const data: UpdateProduct = {
            i_updatedByUserId: user.i_id,
            i_brandId,
            i_productStatusId,
            n_photo,
            n_price,
            n_product,
            n_stock,
        }
        await this.validate({ i_id: input.id })
        await this.product.update(data, { where: { i_id: id } });
        return this.findAll({ i_id: id })
    }

    public async remove(filter: WhereOptions, user: User): Promise<{ count: number; rows: Product[] }> {
        await this.validate(filter)
        await this.product.update({ i_deletedByUserId: user.i_id }, { where: filter });
        const deletedProduct = this.findAll(filter)
        await this.product.destroy({ where: filter });

        return deletedProduct
    }
}

export class ProductStatusRepository {
    @InjectModel(ProductStatus)
    private productStatus: typeof ProductStatus

    private async validate(filter: WhereOptions): Promise<boolean> {
        const result = await this.productStatus.findOne({ where: filter as WhereOptions });
        CheckAvailibility(result, 'Product status not found!')
        return true;
    }

    public async create(input): Promise<{ count: number; rows: ProductStatus[] }> {
        const newProductStatus = await this.productStatus.create(input);
        return await this.findAll({ i_id: newProductStatus.i_id })
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: ProductStatus[] }> {
        const { limit, offset } = options
        return this.productStatus.findAndCountAll({
            where: filter,
            offset: offset,
            limit: limit
        });
    }

    public async update(input: UpdateProductStatus): Promise<{ count: number; rows: ProductStatus[] }> {
        const { id } = input
        await this.validate({ i_id: id })
        await this.productStatus.update(input, { where: { i_id: id } });
        return await this.findAll({ i_id: id })
    }

    public async remove(filter: WhereOptions): Promise<{ count: number; rows: ProductStatus[] }> {
        await this.validate({ filter })
        const deletedProductStatus = await this.findAll(filter)
        await this.productStatus.destroy({ where: filter });
        return deletedProductStatus
    }
}