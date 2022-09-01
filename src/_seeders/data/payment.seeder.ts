import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { CreatePaymentMethod } from "src/payment_methods/dto/payment_method.dto";
import { PaymentMethod } from "src/payment_methods/entities/payment_method.entity";

@Seeder({ model: PaymentMethod, containsForeignKeys: true, foreignDelay: 3000 })
export class SeedPayment implements OnSeederInit {
    run() {
        const data: CreatePaymentMethod[] = [
            {
                i_createdByUserId: 1,
                i_updatedByUserId: 1,
                n_accountName: 'M. Daffa R. A.',
                n_accountNumber: '123 123 123',
                n_paymentMethod: 'BCA'
            }
        ];
        return data
    }
}