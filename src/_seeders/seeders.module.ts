import { Module } from "@nestjs/common";
import { SeedBrandsModule } from "./brands/seed-brands.module";
import { SeedProductStatusModule } from "./product-status/seed-product-status.module";
import { SeedProductsModule } from "./products/seed-products.module";
import { SeedRolesModule } from "./roles/seed-roles.module";
import { SeedUsersModule } from "./users/seed-users.module";

@Module({
    imports: [
        SeedUsersModule,
        SeedRolesModule,
        // SeedProductsModule,
        SeedBrandsModule,
        SeedProductStatusModule
    ]
})
export class SeedersModule { }