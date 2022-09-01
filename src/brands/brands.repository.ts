import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { Options, QueryOptions } from "src/utils/options";
import { OptionsAuthorize } from "src/utils/options-authorize";
import { CreateBrand, UpdateBrand } from "./dto/brand.dto";
import { Brand } from "./entities/brand.entity";

export class BrandRepository {
    @InjectModel(Brand)
    private brand: typeof Brand

    private async verifyBrand(filter: WhereOptions) {
        const brand = await this.brand.findOne({ where: filter });
        CheckAvailibility(brand, 'Brand not found!')
        return
    }

    public async create(input: CreateBrand, user: User): Promise<{ count: number; rows: Brand[] }> {
        const { c_active, n_brand, n_photo } = input
        const data: CreateBrand = {
            c_active,
            i_createdByUserId: user.i_id,
            i_updatedByUserId: user.i_id,
            n_brand,
            n_photo
        }
        await this.brand.create(data as any);

        return this.findAll(data as any)
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: Brand[] }> {
        return this.brand.findAndCountAll(QueryOptions(filter, options));
    }

    public async update(input: UpdateBrand, user: User): Promise<{ count: number; rows: Brand[] }> {
        const { id, c_active, n_brand, n_photo } = input
        const data: UpdateBrand = {
            c_active,
            i_updatedByUserId: user.i_id,
            n_brand,
            n_photo
        }

        await this.verifyBrand({ i_id: input.id })
        await this.brand.update(data, { where: { i_id: id } });

        return this.findAll(data as any)
    }

    public async remove(filter: WhereOptions, user: User): Promise<{ count: number; rows: Brand[] }> {
        await this.verifyBrand(filter)
        await this.brand.update({ i_deletedByUserId: user.i_id }, { where: filter });
        const deletedBrand = await this.findAll(filter)
        await this.brand.destroy({ where: filter });

        return deletedBrand
    }

}