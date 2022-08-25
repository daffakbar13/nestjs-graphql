import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { FilterProduct, UpdateProduct } from "./dto/product.dto";
import { UpdateProductStatus } from "./dto/product-status.dto";
import { Product } from "./entities/product.entity";
import { ProductStatus } from "./entities/product-status.entity";
import { Options } from "src/utils/options";
import { CheckAvailibility } from "src/utils/notfound-exception";

export class ProductRepository {
    @InjectModel(Product)
    private product: typeof Product

    private async findOne(filter: WhereOptions): Promise<Product> {
        const result = await this.product.findOne({ where: filter });
        CheckAvailibility(result, 'Product not found!')
        return result;
    }

    public create(input): Promise<Product> {
        return this.product.create(input);
    }

    public findAll(filter: FilterProduct, options: Options): Promise<{ count: number; rows: Product[] }> {
        return this.product.findAndCountAll({
            where: filter as any,
            offset: options.offset,
            limit: options.limit
        });
    }

    public async update(input: UpdateProduct): Promise<void> {
        await this.findOne({ i_id: input.id })
        await this.product.update(input, { where: { i_id: input.id } });
    }

    public async remove(filter: FilterProduct): Promise<void> {
        await this.product.destroy({ where: filter as WhereOptions });
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
        return this.productStatus.findAndCountAll({
            where: filter,
            offset: options.offset,
            limit: options.limit
        });
    }

    public async update(input: UpdateProductStatus): Promise<void> {
        await this.findOne({ i_id: input.id })
        await this.productStatus.update(input, { where: { i_id: input.id } });
    }

    public async remove(filter: FilterProduct): Promise<void> {
        await this.productStatus.destroy(
            { where: filter as WhereOptions }
        );
    }
}