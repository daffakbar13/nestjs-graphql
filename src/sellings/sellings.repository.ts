import { InjectModel } from "@nestjs/sequelize";
import { Options, Query } from "src/utils/options";
import { CreateSelling, FilterSelling, UpdateSelling } from "./dto/selling.dto";
import { Selling } from "./entities/selling.entity";

export class SellingRepository {
    @InjectModel(Selling)
    private selling: typeof Selling

    public async create(input: CreateSelling): Promise<{ count: number; rows: Selling[] }> {
        const created = await this.selling.create({ ...input });

        return { count: 1, rows: [created] }
    }

    public findAll(filter: FilterSelling, options?: Options): Promise<{ count: number; rows: Selling[] }> {
        return this.selling.findAndCountAll(Query({ ...filter }, options));
    }

    public async update(filter: FilterSelling, input: UpdateSelling): Promise<{ count: number; rows: Selling[] }> {
        const [count, rows] = await this.selling.update({ ...input }, { where: { ...filter }, returning: true });
        return { count, rows }
    }
}