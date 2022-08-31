import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { CheckAvailibility } from "src/utils/notfound-exception";
import { Options } from "src/utils/options";
import { OptionsAuthorize } from "src/utils/options-authorize";
import { CreatePaymentMethod, UpdatePaymentMethod } from "./dto/payment_method.dto";
import { PaymentMethod } from "./entities/payment_method.entity";

export class PaymentMethodRepository {
    @InjectModel(PaymentMethod)
    private paymentMethod: typeof PaymentMethod

    private async verifyPaymentMethod(filter: WhereOptions) {
        const paymentMethod = await this.paymentMethod.findOne({ where: filter });
        CheckAvailibility(paymentMethod, 'Payment method not found!')
        return
    }

    public async create(input: CreatePaymentMethod, user: User): Promise<{ count: number; rows: PaymentMethod[] }> {
        const { n_accountName, n_accountNumber, n_paymentMethod } = input
        const data: CreatePaymentMethod = {
            i_createdByUserId: user.i_id,
            i_updatedByUserId: user.i_id,
            n_accountName,
            n_accountNumber,
            n_paymentMethod
        }
        await this.paymentMethod.create(data as any);

        return this.findAll(data as any)
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: PaymentMethod[] }> {
        const { offset, limit } = OptionsAuthorize(options)
        return this.paymentMethod.findAndCountAll({
            where: filter,
            offset,
            limit
        });
    }

    public async update(input: UpdatePaymentMethod, user: User): Promise<{ count: number; rows: PaymentMethod[] }> {
        const { id, n_accountName, n_accountNumber, n_paymentMethod } = input
        const data: UpdatePaymentMethod = {
            i_updatedByUserId: user.i_id,
            n_accountName,
            n_accountNumber,
            n_paymentMethod
        }

        await this.verifyPaymentMethod({ i_id: input.id })
        await this.paymentMethod.update(data, { where: { i_id: id } });

        return this.findAll(data as any)
    }

    public async remove(filter: WhereOptions, user: User): Promise<{ count: number; rows: PaymentMethod[] }> {
        await this.verifyPaymentMethod(filter)
        await this.paymentMethod.update({ i_deletedByUserId: user.i_id }, { where: filter });
        const deletedPaymentMethod = await this.findAll(filter)
        await this.paymentMethod.destroy({ where: filter });

        return deletedPaymentMethod
    }

}