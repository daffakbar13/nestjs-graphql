import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CreateProduct, FilterProduct, UpdateProduct } from "./dto/product.dto";
import { UpdateProductStatus } from "./dto/product-status.dto";
import { Product } from "./entities/product.entity";
import { ProductStatus } from "./entities/product-status.entity";
import { Options } from "src/utils/options";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { User } from "src/users/entities/user.entity";

export class ProductRepository {
    @InjectModel(Product)
    private product: typeof Product

    private async findOne(filter: WhereOptions): Promise<Product> {
        const result = await this.product.findOne({ where: filter });
        CheckAvailibility(result, 'Product not found!')
        return result;
    }

    public create(input: CreateProduct, user: User): Promise<Product> {
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
        return this.product.create(data as any);
    }

    public findAll(filter: FilterProduct, options: Options): Promise<{ count: number; rows: Product[] }> {
        return this.product.findAndCountAll({
            where: filter as any,
            offset: options.offset,
            limit: options.limit
        });
    }

    public async update(input: UpdateProduct, user: User): Promise<void> {
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

        await this.findOne({ i_id: input.id })
        await this.product.update(data, { where: { i_id: id } });
    }

    public async remove(filter: WhereOptions, user: User): Promise<void> {
        await this.product.update({ i_deletedByUserId: user.i_id }, { where: filter });
        await this.product.destroy({ where: filter });
    }
}

export class ProductStatusRepository {
    @InjectModel(ProductStatus)
    private productStatus: typeof ProductStatus

    private async findOne(filter: FilterProduct) {
        const result = await this.productStatus.findOne({ where: filter as WhereOptions });
        CheckAvailibility(result, 'Product status not found!')
        return result;
    }

    public create(input): Promise<ProductStatus> {
        return this.productStatus.create(input);
    }

    public findAll(filter: WhereOptions, options: Options): Promise<{ count: number; rows: ProductStatus[] }> {
        const { limit, offset } = options
        return this.productStatus.findAndCountAll({
            where: filter,
            offset: offset,
            limit: limit
        });
    }

    public async update(input: UpdateProductStatus): Promise<void> {
        await this.findOne({ i_id: input.id })
        await this.productStatus.update(input, { where: { i_id: input.id } });
    }

    public async remove(filter: WhereOptions): Promise<void> {
        await this.productStatus.destroy(
            { where: filter }
        );
    }
}