import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/utils/current-user';
import { PaymentMethodService } from './payment_methods.service';
import { ArgsPaymentMethod, CreatePaymentMethod, UpdatePaymentMethod } from './dto/payment_method.dto';
import { PaymentMethod, PaymentMethodModel } from './entities/payment_method.entity';
import { UserService } from 'src/auth/auth.service';
import { UserModel } from 'src/auth/entities/user.entity';
import { SellingModel } from 'src/sellings/entities/selling.entity';
import { SellingService } from 'src/sellings/sellings.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly userService: UserService
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

  @ResolveField(() => UserModel)
  protected createadBy(@Parent() payment: PaymentMethod): Promise<UserModel> {
    return this.userService.findAll({ i_id: payment.i_createdByUserId })
  }

  @ResolveField(() => UserModel)
  protected updatedBy(@Parent() payment: PaymentMethod): Promise<UserModel> {
    return this.userService.findAll({ i_id: payment.i_updatedByUserId })
  }

  @ResolveField(() => UserModel)
  protected deletedBy(@Parent() payment: PaymentMethod): Promise<UserModel> {
    return this.userService.findAll({ i_id: payment.i_deletedByUserId })
  }
}
