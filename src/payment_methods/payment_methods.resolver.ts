import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/utils/current-user';
import { PaymentMethodService } from './payment_methods.service';
import { ArgsPaymentMethod, CreatePaymentMethod, UpdatePaymentMethod } from './dto/payment_method.dto';
import { PaymentMethod, PaymentMethodModel } from './entities/payment_method.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
  ) { }
  @Mutation(() => PaymentMethodModel)
  protected async createPaymentMethod(
    @Args(CreatePaymentMethod.KEY) input: CreatePaymentMethod,
    @CurrentUser() token: string
  ) {
    return await this.paymentMethodService.create(input, token);
  }

  @Query(() => PaymentMethodModel, { name: 'PaymentMethods' })
  protected findAll(@Args() args: ArgsPaymentMethod): Promise<PaymentMethodModel> {
    return this.paymentMethodService.findAll(args.filter, args.options);
  }

  // @ResolveField(() => ProductModel)
  // protected products(@Parent() PaymentMethod: PaymentMethod): Promise<ProductModel> {
  //   return this.productService.findAll({ i_PaymentMethodId: PaymentMethod.i_id })
  // }

  @Mutation(() => PaymentMethodModel)
  protected updatePaymentMethod(
    @Args(UpdatePaymentMethod.KEY) input: UpdatePaymentMethod,
    @CurrentUser() token: string
  ): Promise<PaymentMethodModel> {
    return this.paymentMethodService.update(input, token);
  }

  @Mutation(() => PaymentMethodModel)
  protected async removePaymentMethod(
    @Args('id') id: number,
    @CurrentUser() token: string
  ): Promise<PaymentMethodModel> {
    return await this.paymentMethodService.remove({ i_id: id }, token);
  }
}
