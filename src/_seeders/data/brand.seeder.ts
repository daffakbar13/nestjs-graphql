import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { CreateBrand } from "src/brands/dto/brand.dto";
import { Brand } from "src/brands/entities/brand.entity";

@Seeder({ model: Brand, containsForeignKeys: true, foreignDelay: 3000 })
export class SeedBrand implements OnSeederInit {
    run() {
        const data: CreateBrand[] = [
            {
                i_createdByUserId: 2,
                i_updatedByUserId: 2,
                n_brand: 'Gudang Garam',
                n_photo: 'gudanggaram.jpg',
                c_active: true
            },
            {
                i_createdByUserId: 2,
                i_updatedByUserId: 2,
                n_brand: 'Gudang Garam',
                n_photo: 'gudanggaram.jpg',
                c_active: true
            },
            {
                i_createdByUserId: 2,
                i_updatedByUserId: 2,
                n_brand: 'Gudang Garam',
                n_photo: 'gudanggaram.jpg',
                c_active: true
            },
            {
                i_createdByUserId: 2,
                i_updatedByUserId: 2,
                n_brand: 'Gudang Garam',
                n_photo: 'gudanggaram.jpg',
                c_active: true
            },
            {
                i_createdByUserId: 2,
                i_updatedByUserId: 2,
                n_brand: 'Gudang Garam',
                n_photo: 'gudanggaram.jpg',
                c_active: true
            },
            {
                i_createdByUserId: 2,
                i_updatedByUserId: 2,
                n_brand: 'Gudang Garam',
                n_photo: 'gudanggaram.jpg',
                c_active: true
            }
        ];
        return data
    }
}