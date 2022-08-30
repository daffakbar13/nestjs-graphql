import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/utils/current-user';
import { PaymentService } from './payments.service';
import { ArgsPayment, CreatePayment, UpdatePayment } from './dto/payment.dto';
import { Payment, PaymentModel } from './entities/Payment.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
  ) { }
  @Mutation(() => PaymentModel)
  protected async createPayment(
    @Args(CreatePayment.KEY) input: CreatePayment,
    @CurrentUser() token: string
  ) {
    return await this.paymentService.create(input, token);
  }

  @Query(() => PaymentModel, { name: 'payment' })
  protected findAll(@Args() args: ArgsPayment): Promise<PaymentModel> {
    return this.paymentService.findAll(args.filter, args.options);
  }

  // @ResolveField(() => ProductModel)
  // protected products(@Parent() Payment: Payment): Promise<ProductModel> {
  //   return this.productService.findAll({ i_paymentId: Payment.i_id })
  // }

  @Mutation(() => PaymentModel)
  protected updatePayment(
    @Args(UpdatePayment.KEY) input: UpdatePayment,
    @CurrentUser() token: string
  ): Promise<PaymentModel> {
    return this.paymentService.update(input, token);
  }

  @Mutation(() => PaymentModel)
  protected async removePayment(
    @Args('id') id: number,
    @CurrentUser() token: string
  ): Promise<PaymentModel> {
    return await this.paymentService.remove({ i_id: id }, token);
  }
}
