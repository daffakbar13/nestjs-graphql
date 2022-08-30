import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/utils/current-user';
import { SellingService } from './sellings.service';
import { ArgsSelling, CreateSelling, UpdateSelling } from './dto/selling.dto';
import { Selling, SellingModel } from './entities/selling.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Selling)
export class SellingResolver {
  constructor(
    private readonly sellingService: SellingService,
  ) { }
  @Mutation(() => SellingModel)
  protected async createSelling(
    @Args(CreateSelling.KEY) input: CreateSelling,
    @CurrentUser() token: string
  ) {
    return await this.sellingService.create(input, token);
  }

  @Query(() => SellingModel, { name: 'Selling' })
  protected findAll(@Args() args: ArgsSelling): Promise<SellingModel> {
    return this.sellingService.findAll(args.filter, args.options);
  }

  // @ResolveField(() => ProductModel)
  // protected products(@Parent() Selling: Selling): Promise<ProductModel> {
  //   return this.productService.findAll({ i_SellingId: Selling.i_id })
  // }

  @Mutation(() => SellingModel)
  protected updateSelling(
    @Args(UpdateSelling.KEY) input: UpdateSelling,
    @CurrentUser() token: string
  ): Promise<SellingModel> {
    return this.sellingService.update(input, token);
  }

  @Mutation(() => SellingModel)
  protected async removeSelling(
    @Args('id') id: number,
    @CurrentUser() token: string
  ): Promise<SellingModel> {
    return await this.sellingService.remove({ i_id: id }, token);
  }
}
