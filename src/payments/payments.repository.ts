import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { Options } from "src/utils/options";
import { OptionsAuthorize } from "src/utils/options-authorize";
import { CreatePayment, UpdatePayment } from "./dto/payment.dto";
import { Payment } from "./entities/payment.entity";

export class PaymentRepository {
    @InjectModel(Payment)
    private payment: typeof Payment

    private async verifyPayment(filter: WhereOptions) {
        const payment = await this.payment.findOne({ where: filter });
        CheckAvailibility(payment, 'Payment not found!')
        return
    }

    public async create(input: CreatePayment, user: User): Promise<{ count: number; rows: Payment[] }> {
        const { n_accountName, n_accountNumber, n_paymentMethod } = input
        const data: CreatePayment = {
            i_createdByUserId: user.i_id,
            i_updatedByUserId: user.i_id,
            n_accountName,
            n_accountNumber,
            n_paymentMethod
        }
        await this.payment.create(data as any);

        return this.findAll(data as any)
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: Payment[] }> {
        const { offset, limit } = OptionsAuthorize(options)
        return this.payment.findAndCountAll({
            where: filter,
            offset,
            limit
        });
    }

    public async update(input: UpdatePayment, user: User): Promise<{ count: number; rows: Payment[] }> {
        const { id, n_accountName, n_accountNumber, n_paymentMethod } = input
        const data: UpdatePayment = {
            i_updatedByUserId: user.i_id,
            n_accountName,
            n_accountNumber,
            n_paymentMethod,
        }

        await this.verifyPayment({ i_id: input.id })
        await this.payment.update(data, { where: { i_id: id } });

        return this.findAll(data as any)
    }

    public async remove(filter: WhereOptions, user: User): Promise<{ count: number; rows: Payment[] }> {
        await this.verifyPayment(filter)
        await this.payment.update({ i_deletedByUserId: user.i_id }, { where: filter });
        const deletedPayment = await this.findAll(filter)
        await this.payment.destroy({ where: filter });

        return deletedPayment
    }
}