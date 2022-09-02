import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { Options, QueryOptions } from "src/utils/options";
import { CreateBrand, UpdateBrand } from "./dto/brand.dto";
import { Brand } from "./entities/brand.entity";

export class BrandRepository {
    @InjectModel(Brand)
    private brand: typeof Brand

    public async create(input, user: User): Promise<{ count: number; rows: Brand[] }> {
        Object.assign(input, {
            i_createdByUserId: user.i_id,
            i_updatedByUserId: user.i_id,
        })
        const created = await this.brand.create(input);

        return { count: 1, rows: [created] }
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: Brand[] }> {
        return this.brand.findAndCountAll(QueryOptions(filter, options));
    }

    public async update(input: UpdateBrand, user: User): Promise<{ count: number; rows: Brand[] }> {
        Object.assign(input, { i_updatedByUserId: user.i_id })
        const [count, rows] = await this.brand.update(input, { where: { i_id: input.id }, returning: true });

        return { count, rows }
    }

    public async remove(filter: WhereOptions, user: User): Promise<{ count: number; rows: Brand[] }> {
        const [count, rows] = await this.brand.update({ i_deletedByUserId: user.i_id }, { where: filter, returning: true });
        await this.brand.destroy({ where: filter });

        return { count, rows }
    }
}