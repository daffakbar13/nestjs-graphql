import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CreateProduct, FilterProduct, UpdateProduct } from "./dto/product.dto";
import { UpdateProductStatus } from "./dto/product-status.dto";
import { Product } from "./entities/product.entity";
import { ProductStatus } from "./entities/product-status.entity";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { Options, Query } from "src/utils/options";

export class ProductRepository {
    @InjectModel(Product)
    private product: typeof Product

    public async create(input: CreateProduct): Promise<{ count: number; rows: Product[] }> {
        const created = await this.product.create({ ...input });
        return { count: 1, rows: [created] }
    }

    public findAll(filter: FilterProduct, options?: Options): Promise<{ count: number; rows: Product[] }> {
        return this.product.findAndCountAll(Query({ ...filter }, { ...options }));
    }

    public async update(filter: FilterProduct, input: UpdateProduct): Promise<{ count: number; rows: Product[] }> {
        const [count, rows] = await this.product.update({ ...input }, { where: { ...filter }, returning: true });
        return { count, rows }
    }

    public async remove(filter: FilterProduct): Promise<void> {
        await this.product.destroy({ where: { ...filter } });
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
        const created = await this.productStatus.create(input);
        return { count: 1, rows: [created] }
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: ProductStatus[] }> {
        return this.productStatus.findAndCountAll(Query(filter, options));
    }

    public async update(input: UpdateProductStatus): Promise<{ count: number; rows: ProductStatus[] }> {
        const [count, rows] = await this.productStatus.update(input, { where: { i_id: input.id }, returning: true });
        return { count, rows }
    }

    public async remove(filter: WhereOptions): Promise<{ count: number; rows: ProductStatus[] }> {
        const deleted = await this.findAll(filter)
        await this.productStatus.destroy({ where: filter });
        return deleted
    }
}