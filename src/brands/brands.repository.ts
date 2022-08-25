import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { Options } from "src/utils/options";
import { Brand } from "./entities/brand.entity";

export class BrandRepository {
    @InjectModel(Brand)
    private brand: typeof Brand

    private async findOne(filter: WhereOptions) {
        const result = await this.brand.findOne({ where: filter });
        CheckAvailibility(result, 'Brand not found!')
        return result;
    }

    public create(input): Promise<Brand> {
        return this.brand.create(input);
    }

    public findAll(option: Options, filter: WhereOptions): Promise<{ count: number; rows: Brand[] }> {
        return this.brand.findAndCountAll({
            where: filter,
            offset: option.offset,
            limit: option.limit
        });
    }

    public async update(input): Promise<void> {
        await this.findOne({ i_id: input.id })
        await this.brand.update(input, { where: { i_id: input.id } });
    }

    public async remove(filter: WhereOptions): Promise<void> {
        await this.findOne(filter)
        await this.brand.destroy(
            { where: filter }
        );
    }

}