import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { CreateProductStatus } from "src/products/dto/product-status.dto";
import { ProductStatus } from "src/products/entities/product-status.entity";

@Seeder({ model: ProductStatus, containsForeignKeys: true, foreignDelay: 2000 })
export class SeedProductStatus implements OnSeederInit {
    run() {
        const data: CreateProductStatus[] = [
            {
                n_status: 'Published',
            }
        ];
        return data
    }
}