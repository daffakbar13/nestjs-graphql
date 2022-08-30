import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { Product } from "src/products/entities/product.entity";
import { SeedProduct } from "./product.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([Product]),
        SeederModule.forFeature([
            SeedProduct,
        ])
    ]
})
export class SeedProductsModule { }