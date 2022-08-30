import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { Role } from "src/auth/entities/role.entity";
import { SeedRoleAdmin, SeedRoleSuperAdmin, SeedRoleUser } from "./role.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([Role]),
        SeederModule.forFeature([
            SeedRoleUser,
            SeedRoleAdmin,
            SeedRoleSuperAdmin
        ])
    ]
})
export class SeedRolesModule { }