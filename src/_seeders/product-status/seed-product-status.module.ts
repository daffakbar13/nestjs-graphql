import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { ProductStatus } from "src/products/entities/product-status.entity";
import { Product } from "src/products/entities/product.entity";
import { SeedProductStatus } from "../product-status/product-status.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([ProductStatus]),
        SeederModule.forFeature([
            SeedProductStatus
        ])
    ]
})
export class SeedProductStatusModule { }