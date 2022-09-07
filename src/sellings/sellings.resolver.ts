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
  protected createSelling(
    @Args(CreateSelling.KEY) input: CreateSelling,
    @CurrentUser() token: string
  ) {
    return this.sellingService.create(input, token);
  }

  @Query(() => SellingModel, { name: 'selling' })
  protected findAll(@Args() args: ArgsSelling): Promise<SellingModel> {
    return this.sellingService.findAll(args.filter, args.options);
  }

  @Mutation(() => SellingModel)
  protected updateSelling(@Args(UpdateSelling.KEY) args: UpdateSelling): Promise<SellingModel> {
    return this.sellingService.update(args.filter, args);
  }
}
