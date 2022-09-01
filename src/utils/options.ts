import { InputType, Field } from "@nestjs/graphql"
import { WhereOptions } from "sequelize"
import { FilterProduct } from "src/products/dto/product.dto"
import { Product } from "src/products/entities/product.entity"

@InputType()
export class OrderBy {
    @Field(() => [String], { nullable: 'itemsAndList' })
    public readonly ascending: string[]

    @Field(() => [String], { nullable: 'itemsAndList' })
    public readonly descending: string[]
}
@InputType()
export class Options {
    @Field({ nullable: true })
    public readonly limit?: number

    @Field({ nullable: true })
    public readonly offset?: number

    @Field({ nullable: true })
    public readonly orderBy?: OrderBy
}

export const OptionsOrder = (options: OrderBy) => {
    const orderBy = []

    if (options !== undefined) {
        const ascending = options.ascending
        const descending = options.descending

        if (ascending !== undefined) {
            ascending.forEach(element => {
                orderBy.push([element, 'ASC'])
            })
        }
        if (descending != undefined) {
            descending.forEach(element => {
                orderBy.push([element, 'DESC'])
            })
        }
    }

    return orderBy
}

export const QueryOptions = (filter: WhereOptions, options: Options): object => {
    return {
        where: filter,
        limit: options?.limit,
        offset: options?.offset,
        order: OptionsOrder(options?.orderBy)
    }
}