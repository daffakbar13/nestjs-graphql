import { InjectModel } from "@nestjs/sequelize";
import { Options, Query } from "src/utils/options";
import { CreateBrand, FilterBrand, UpdateBrand } from "./dto/brand.dto";
import { Brand } from "./entities/brand.entity";

export class BrandRepository {
    @InjectModel(Brand)
    private brand: typeof Brand

    public async create(input: CreateBrand): Promise<{ count: number; rows: Brand[] }> {
        const created = await this.brand.create({ ...input });
        return { count: 1, rows: [created] }
    }

    public findAll(filter: FilterBrand, options?: Options): Promise<{ count: number; rows: Brand[] }> {
        return this.brand.findAndCountAll(Query({ ...filter }, options));
    }

    public async update(filter: FilterBrand, input: UpdateBrand): Promise<{ count: number; rows: Brand[] }> {
        const [count, rows] = await this.brand.update({ ...input }, { where: { ...filter }, returning: true });
        return { count, rows }
    }

    public async remove(filter: FilterBrand): Promise<void> {
        await this.brand.destroy({ where: { ...filter } });
    }
}