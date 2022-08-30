import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { ProductStatus } from "src/products/entities/product-status.entity";

@Seeder({ model: ProductStatus, containsForeignKeys: true, })
export class SeedProductStatus implements OnSeederInit {
    run() {
        const data = [
            {
                n_status: 'Published'
            }
        ];
        return data
    }
}