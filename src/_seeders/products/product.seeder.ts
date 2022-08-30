import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { Product } from "src/products/entities/product.entity";

@Seeder({ model: Product, containsForeignKeys: true, })
export class SeedProduct implements OnSeederInit {
    run() {
        const data = [
            {
                i_brandId: 1,
                i_createdByUserId: 1,
                i_updatedByUserId: 1,
                i_productStatusId: 1,
                n_product: 'Signature',
                n_price: 20000,
                n_stock: 241,
                n_photo: 'signature.jpg',
                d_scheduleTime: null,
            }
        ];
        return data
    }
}