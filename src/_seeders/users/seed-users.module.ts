import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { Role } from "src/auth/entities/role.entity";
import { SeedUser } from "./user.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([Role]),
        SeederModule.forFeature([
            SeedUser,
        ])
    ]
})
export class SeedUsersModule { }