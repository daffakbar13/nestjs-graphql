import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusSellingsService } from './status_sellings.service';
import { StatusSelling } from './entities/status_selling.entity';
import { CreateStatusSellingInput } from './dto/create-status_selling.input';
import { UpdateStatusSellingInput } from './dto/update-status_selling.input';

@Resolver(() => StatusSelling)
export class StatusSellingsResolver {
  constructor(private readonly statusSellingsService: StatusSellingsService) {}

  @Mutation(() => StatusSelling)
  createStatusSelling(@Args('createStatusSellingInput') createStatusSellingInput: CreateStatusSellingInput) {
    return this.statusSellingsService.create(createStatusSellingInput);
  }

  @Query(() => [StatusSelling], { name: 'statusSellings' })
  findAll() {
    return this.statusSellingsService.findAll();
  }

  @Query(() => StatusSelling, { name: 'statusSelling' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.statusSellingsService.findOne(id);
  }

  @Mutation(() => StatusSelling)
  updateStatusSelling(@Args('updateStatusSellingInput') updateStatusSellingInput: UpdateStatusSellingInput) {
    return this.statusSellingsService.update(updateStatusSellingInput.id, updateStatusSellingInput);
  }

  @Mutation(() => StatusSelling)
  removeStatusSelling(@Args('id', { type: () => Int }) id: number) {
    return this.statusSellingsService.remove(id);
  }
}
