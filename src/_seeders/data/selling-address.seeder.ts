import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { CreateSellingAddress } from "src/sellings/dto/selling-address.dto";
import { SellingAddress } from "src/sellings/entities/selling-address.entity";

@Seeder({ model: SellingAddress })
export class SeedSellingAddress implements OnSeederInit {
    run() {
        const data: CreateSellingAddress[] = [
            {
                n_address: 'Bandung',
                n_name: 'Daffa',
                n_phone: '089663417341'
            }
        ];
        return data
    }
}