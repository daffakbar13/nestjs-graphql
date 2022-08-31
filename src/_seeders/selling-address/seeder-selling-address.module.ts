import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { SellingAddress } from "src/sellings/entities/selling-address.entity";
import { SeedSellingAddress } from "./selling-address.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([SellingAddress]),
        SeederModule.forFeature([
            SeedSellingAddress
        ])
    ]
})
export class SeedSellingAddressModule { }