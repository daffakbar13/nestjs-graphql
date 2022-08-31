import { Module } from "@nestjs/common";
import { SeedBrandsModule } from "./brands/seed-brands.module";
import { SeedPaymentsModule } from "./payments/seeder-payments.module";
import { SeedProductStatusModule } from "./product-status/seed-product-status.module";
import { SeedProductsModule } from "./products/seed-products.module";
import { SeedRolesModule } from "./roles/seed-roles.module";
import { SeedSellingAddressModule } from "./selling-address/seeder-selling-address.module";
import { SeedSellingProductModule } from "./selling-product/seeder-selling-product.module";
import { SeedSellingsModule } from "./sellings/seeder-sellings.module";
import { SeedUsersModule } from "./users/seed-users.module";

@Module({
    imports: [
        SeedRolesModule,
        SeedUsersModule,
        SeedBrandsModule,
        SeedProductStatusModule,
        SeedProductsModule,
        SeedPaymentsModule,
        SeedSellingsModule,
        SeedSellingAddressModule,
        SeedSellingProductModule
    ]
})
export class SeedersModule { }