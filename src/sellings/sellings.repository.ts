import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { Options, Query } from "src/utils/options";
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
        const { i_paymentId, i_sellingAddressId, n_grandTotal, n_invoice, n_status } = input
        const data: CreateSelling = {
            i_usersId: user.i_id,
            i_paymentId,
            i_sellingAddressId,
            n_grandTotal,
            n_invoice,
            n_status
        }
        await this.selling.create(data as any);

        return this.findAll(data as any)
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: Selling[] }> {
        return this.selling.findAndCountAll(Query(filter, options));
    }

    public async update(input: UpdateSelling, user: User): Promise<{ count: number; rows: Selling[] }> {
        const { id, i_paymentId, i_sellingAddressId, n_grandTotal, n_invoice, n_status } = input
        const data: UpdateSelling = {
            i_usersId: user.i_id,
            i_paymentId,
            i_sellingAddressId,
            n_grandTotal,
            n_invoice,
            n_status
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