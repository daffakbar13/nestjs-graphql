import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { CreateProduct } from "src/products/dto/product.dto";
import { Product } from "src/products/entities/product.entity";

@Seeder({ model: Product, containsForeignKeys: true, foreignDelay: 4000 })
export class SeedProduct implements OnSeederInit {
    run() {
        const data: CreateProduct[] = [
            {
                i_createdByUserId: 2,
                i_updatedByUserId: 2,
                i_brandId: 1,
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