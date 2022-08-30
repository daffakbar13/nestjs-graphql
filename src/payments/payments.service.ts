import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Options } from 'src/utils/options';
import { OptionsAuthorize } from 'src/utils/options-authorize';
import { PaymentRepository } from './payments.repository';
import { CreatePayment, FilterPayment, UpdatePayment } from './dto/payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    private readonly repository: PaymentRepository,
    private readonly authService: AuthService
  ) { }

  public async create(input: CreatePayment, token: string): Promise<{ count: number; rows: Payment[] }> {
    const user = await this.authService.getUserByToken(token)
    return await this.repository.create(input, user);
  }

  public async findAll(filter: FilterPayment, options?: Options): Promise<{ count: number; rows: Payment[] }> {
    return await this.repository.findAll(
      OptionsAuthorize(filter),
      OptionsAuthorize(options)
    )
  }

  public async update(input: UpdatePayment, token: string): Promise<{ count: number; rows: Payment[] }> {
    const user = (await this.authService.getUserByToken(token))

    return await this.repository.update(input, user);
  }

  public async remove(filter: FilterPayment, token: string): Promise<{ count: number; rows: Payment[] }> {
    const user = await this.authService.getUserByToken(token)

    return await this.repository.remove(
      OptionsAuthorize(filter),
      user
    );
  }
}
