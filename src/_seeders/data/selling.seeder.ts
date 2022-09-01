import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { CreateSelling } from "src/sellings/dto/selling.dto";
import { Selling, SellingStatus } from "src/sellings/entities/selling.entity";

@Seeder({ model: Selling, containsForeignKeys: true, foreignDelay: 3000 })
export class SeedSelling implements OnSeederInit {
    run() {
        const data: CreateSelling[] = [
            {
                i_usersId: 1,
                i_paymentId: 1,
                i_sellingAddressId: 1,
                n_grandTotal: 100000,
                n_invoice: 'asdasd-123123',
                n_status: SellingStatus.Delivered
            }
        ];
        return data
    }
}