import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentResolver } from './payments.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { PaymentRepository } from './payments.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]),
    AuthModule
  ],
  providers: [PaymentResolver, PaymentService, PaymentRepository],
  exports: [PaymentService]
})
export class PaymentsModule { }
