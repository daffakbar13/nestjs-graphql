import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Options } from 'src/utils/options';
import { PaymentMethodRepository } from './payment_methods.repository';
import { CreatePaymentMethod, FilterPaymentMethod, UpdatePaymentMethod } from './dto/payment_method.dto';
import { PaymentMethod } from './entities/payment_method.entity';
import { WhereOptions } from 'sequelize';

@Injectable()
export class PaymentMethodService {
  constructor(
    private readonly repository: PaymentMethodRepository,
    private readonly authService: AuthService
  ) { }

  public async create(input: CreatePaymentMethod, token: string): Promise<{ count: number; rows: PaymentMethod[] }> {
    const user = await this.authService.getUserByToken(token)
    return await this.repository.create(input, user);
  }

  public async findAll(filter: FilterPaymentMethod, options?: Options): Promise<{ count: number; rows: PaymentMethod[] }> {
    return await this.repository.findAll(filter as WhereOptions, options)
  }

  public async update(input: UpdatePaymentMethod, token: string): Promise<{ count: number; rows: PaymentMethod[] }> {
    const user = (await this.authService.getUserByToken(token))

    return await this.repository.update(input, user);
  }

  public async remove(filter: FilterPaymentMethod, token: string): Promise<{ count: number; rows: PaymentMethod[] }> {
    const user = await this.authService.getUserByToken(token)
    const deletedPaymentMethod = await this.repository.remove(filter as WhereOptions, user);

    return deletedPaymentMethod
  }
}
