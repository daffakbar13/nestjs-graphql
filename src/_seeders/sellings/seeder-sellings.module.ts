import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { Selling } from "src/sellings/entities/selling.entity";
import { SeedSelling } from "./selling.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([Selling]),
        SeederModule.forFeature([
            SeedSelling
        ])
    ]
})
export class SeedSellingsModule { }