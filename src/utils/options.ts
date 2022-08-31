import { InputType, Field } from "@nestjs/graphql"
import { FilterProduct } from "src/products/dto/product.dto"
import { Product } from "src/products/entities/product.entity"

@InputType()
export class Options {
    @Field({ nullable: true })
    public readonly limit?: number

    @Field({ nullable: true })
    public readonly offset?: number

    @Field(() => [FilterProduct], { nullable: 'itemsAndList' })
    public readonly tes?: FilterProduct[]

    @Field(() => [[String]], { nullable: 'itemsAndList' })
    public readonly order?: string[]
}