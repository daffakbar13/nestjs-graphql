import { Module } from "@nestjs/common";
import { SeederModule } from "nestjs-sequelize-seeder";
import { SeedBrand } from "./data/brand.seeder";
import { SeedPayment } from "./data/payment.seeder";
import { SeedProductStatus } from "./data/product-status.seeder";
import { SeedProduct } from "./data/product.seeder";
import { SeedRoleCustomer, SeedRoleAdmin, SeedRoleSuperAdmin } from "./data/role.seeder";
import { SeedSellingAddress } from "./data/selling-address.seeder";
import { SeedSellingProduct } from "./data/selling-product.seeder";
import { SeedSelling } from "./data/selling.seeder";
import { SeedUser } from "./data/user.seeder";

@Module({
    imports: [
        SeederModule.forFeature([
            SeedSellingProduct
        ]),
        SeederModule.forFeature([
            SeedUser,
        ]),
        SeederModule.forFeature([
            SeedRoleCustomer,
            SeedRoleAdmin,
            SeedRoleSuperAdmin
        ]),
        SeederModule.forFeature([
            SeedBrand
        ]),
        SeederModule.forFeature([
            SeedProductStatus
        ]),
        SeederModule.forFeature([
            SeedProduct,
        ]),
        SeederModule.forFeature([
            SeedPayment
        ]),
        SeederModule.forFeature([
            SeedSelling
        ]),
        SeederModule.forFeature([
            SeedSellingAddress
        ]),

    ]
})
export class SeedersModule { }