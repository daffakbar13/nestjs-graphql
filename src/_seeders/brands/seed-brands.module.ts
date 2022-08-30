import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { Brand } from "src/brands/entities/brand.entity";
import { SeedBrand } from "./brand.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([Brand]),
        SeederModule.forFeature([
            SeedBrand
        ])
    ]
})
export class SeedBrandsModule { }