import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { SellingProduct } from "src/sellings/entities/selling-product.entity";
import { SeedSellingProduct } from "./selling-product.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([SellingProduct]),
        SeederModule.forFeature([
            SeedSellingProduct
        ])
    ]
})
export class SeedSellingProductModule { }