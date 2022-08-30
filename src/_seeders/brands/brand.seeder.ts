import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { Brand } from "src/brands/entities/brand.entity";

@Seeder({ model: Brand, containsForeignKeys: true, })
export class SeedBrand implements OnSeederInit {
    run() {
        const data = [
            {
                i_createdByUserId: 1,
                i_updatedByUserId: 1,
                n_brand: 'Gudang Garam',
                n_photo: 'gudanggaram.jpg',
                c_active: true
            }
        ];
        return data
    }
}