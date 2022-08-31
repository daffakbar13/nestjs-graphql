import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_methods.service';
import { PaymentMethodResolver } from './payment_methods.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './entities/payment_method.entity';
import { PaymentMethodRepository } from './payment_methods.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PaymentMethod]),
    AuthModule
  ],
  providers: [PaymentMethodResolver, PaymentMethodService, PaymentMethodRepository]
})
export class PaymentMethodsModule { }
