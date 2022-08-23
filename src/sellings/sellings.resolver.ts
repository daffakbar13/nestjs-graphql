import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SellingsService } from './sellings.service';
import { Selling } from './entities/selling.entity';
import { CreateSellingInput } from './dto/create-selling.input';
import { UpdateSellingInput } from './dto/update-selling.input';

@Resolver(() => Selling)
export class SellingsResolver {
  constructor(private readonly sellingsService: SellingsService) {}

  @Mutation(() => Selling)
  createSelling(@Args('createSellingInput') createSellingInput: CreateSellingInput) {
    return this.sellingsService.create(createSellingInput);
  }

  @Query(() => [Selling], { name: 'sellings' })
  findAll() {
    return this.sellingsService.findAll();
  }

  @Query(() => Selling, { name: 'selling' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellingsService.findOne(id);
  }

  @Mutation(() => Selling)
  updateSelling(@Args('updateSellingInput') updateSellingInput: UpdateSellingInput) {
    return this.sellingsService.update(updateSellingInput.id, updateSellingInput);
  }

  @Mutation(() => Selling)
  removeSelling(@Args('id', { type: () => Int }) id: number) {
    return this.sellingsService.remove(id);
  }
}
