import { Seeder, OnSeederInit } from "nestjs-sequelize-seeder";
import { CreateSellingProduct } from "src/sellings/dto/selling-product.dto";
import { SellingProduct } from "src/sellings/entities/selling-product.entity";

@Seeder({ model: SellingProduct, containsForeignKeys: true, foreignDelay: 5000 })
export class SeedSellingProduct implements OnSeederInit {
    run() {
        const data: CreateSellingProduct[] = [
            {
                i_sellingId: 1,
                n_brand: 'Gudang Garam',
                n_product: 'Signature',
                n_photo: 'signature.jpg',
                n_price: 1,
                n_quantity: 1,
                total: 20000
            }
        ];
        return data
    }
}