import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { Options } from "src/utils/options";
import { OptionsAuthorize } from "src/utils/options-authorize";
import { CreateSelling, UpdateSelling } from "./dto/selling.dto";
import { Selling } from "./entities/selling.entity";

export class SellingRepository {
    @InjectModel(Selling)
    private selling: typeof Selling

    private async verifySelling(filter: WhereOptions) {
        const selling = await this.selling.findOne({ where: filter });
        CheckAvailibility(selling, 'Selling not found!')
        return
    }

    public async create(input: CreateSelling, user: User): Promise<{ count: number; rows: Selling[] }> {
        const { n_accountName, n_accountNumber, n_SellingMethod } = input
        const data: CreateSelling = {
            i_createdByUserId: user.i_id,
            i_updatedByUserId: user.i_id,
            n_accountName,
            n_accountNumber,
            n_SellingMethod
        }
        await this.selling.create(data as any);

        return this.findAll(data as any)
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: Selling[] }> {
        const { offset, limit } = OptionsAuthorize(options)
        return this.selling.findAndCountAll({
            where: filter,
            offset,
            limit
        });
    }

    public async update(input: UpdateSelling, user: User): Promise<{ count: number; rows: Selling[] }> {
        const { id, n_accountName, n_accountNumber, n_SellingMethod } = input
        const data: UpdateSelling = {
            i_updatedByUserId: user.i_id,
            n_accountName,
            n_accountNumber,
            n_SellingMethod,
        }

        await this.verifySelling({ i_id: input.id })
        await this.selling.update(data, { where: { i_id: id } });

        return this.findAll(data as any)
    }

    public async remove(filter: WhereOptions, user: User): Promise<{ count: number; rows: Selling[] }> {
        await this.verifySelling(filter)
        await this.selling.update({ i_deletedByUserId: user.i_id }, { where: filter });
        const deletedSelling = await this.findAll(filter)
        await this.selling.destroy({ where: filter });

        return deletedSelling
    }
}