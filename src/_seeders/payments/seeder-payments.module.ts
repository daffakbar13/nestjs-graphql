import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederModule } from "nestjs-sequelize-seeder";
import { PaymentMethod } from "src/payment_methods/entities/payment_method.entity";
import { SeedPayment } from "./payment.seeder";

@Module({
    imports: [
        SequelizeModule.forFeature([PaymentMethod]),
        SeederModule.forFeature([
            SeedPayment
        ])
    ]
})
export class SeedPaymentsModule { }