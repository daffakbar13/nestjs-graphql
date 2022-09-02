import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { Options, QueryOptions } from "src/utils/options";
import { UpdatePaymentMethod } from "./dto/payment_method.dto";
import { PaymentMethod } from "./entities/payment_method.entity";

export class PaymentMethodRepository {
    @InjectModel(PaymentMethod)
    private paymentMethod: typeof PaymentMethod

    public async create(input, user: User): Promise<{ count: number; rows: PaymentMethod[] }> {
        Object.assign(input, {
            i_createdByUserId: user.i_id,
            i_updatedByUserId: user.i_id,
        })
        const created = await this.paymentMethod.create(input);

        return { count: 1, rows: [created] }
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: PaymentMethod[] }> {
        return this.paymentMethod.findAndCountAll(QueryOptions(filter, options));
    }

    public async update(input: UpdatePaymentMethod, user: User): Promise<{ count: number; rows: PaymentMethod[] }> {
        Object.assign(input, { i_updatedByUserId: user.i_id })
        const [count, rows] = await this.paymentMethod.update(input, { where: { i_id: input.id }, returning: true });

        return { count, rows }
    }

    public async remove(filter: WhereOptions, user: User): Promise<{ count: number; rows: PaymentMethod[] }> {
        const [count, rows] = await this.paymentMethod.update({ i_deletedByUserId: user.i_id }, { where: filter, returning: true });
        await this.paymentMethod.destroy({ where: filter });

        return { count, rows }
    }

}