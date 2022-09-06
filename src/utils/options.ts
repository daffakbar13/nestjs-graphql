import { InputType, Field } from "@nestjs/graphql"
import { WhereOptions } from "sequelize"
import { OpTypes } from "sequelize/types/operators"

@InputType()
class ValueString {
    @Field()
    readonly column: string

    @Field()
    readonly value: string
}

@InputType()
class ValueNumber {
    @Field()
    readonly column: string

    @Field()
    readonly value: number
}

@InputType()
class ValueBoolean {
    @Field()
    readonly column: string

    @Field({ nullable: true })
    readonly value: boolean
}

@InputType()
class ValueArrayString {
    @Field()
    readonly column: string

    @Field(() => [String])
    readonly value: string[]
}

@InputType()
class ValueArrayNumber {
    @Field()
    readonly column: string

    @Field(() => [Number])
    readonly value: number[]
}

@InputType()
class ValueFunction {
    @Field()
    readonly column: string

    @Field()
    readonly function: string

    @Field()
    readonly value: number
}

@InputType()
class Operator {
    @Field({ nullable: true })
    readonly adjacent: ValueArrayNumber

    @Field({ nullable: true })
    readonly all: ValueString

    @Field({ nullable: true })
    readonly and: string

    @Field({ nullable: true })
    readonly any: ValueArrayNumber

    @Field({ nullable: true })
    readonly between: ValueArrayNumber

    @Field({ nullable: true })
    readonly col: ValueString

    @Field({ nullable: true })
    readonly contained: ValueArrayNumber

    @Field({ nullable: true })
    readonly contains: ValueArrayNumber

    @Field({ nullable: true })
    readonly endsWith: ValueString

    @Field({ nullable: true })
    readonly eq: ValueString

    @Field({ nullable: true })
    readonly gt: ValueNumber

    @Field({ nullable: true })
    readonly gte: ValueNumber

    @Field({ nullable: true })
    readonly iLike: ValueString

    @Field({ nullable: true })
    readonly in: ValueArrayString

    @Field({ nullable: true })
    readonly iRegexp: ValueString

    @Field({ nullable: true })
    readonly is: ValueBoolean

    @Field({ nullable: true })
    readonly like: ValueString

    @Field({ nullable: true })
    readonly lt: ValueNumber

    @Field({ nullable: true })
    readonly lte: ValueNumber

    @Field({ nullable: true })
    readonly match: ValueFunction

    @Field({ nullable: true })
    readonly ne: ValueString

    @Field({ nullable: true })
    readonly noExtendLeft: ValueArrayNumber

    @Field({ nullable: true })
    readonly noExtendRight: ValueArrayNumber

    @Field({ nullable: true })
    readonly not: ValueBoolean

    @Field({ nullable: true })
    readonly notBetween: ValueArrayNumber

    @Field({ nullable: true })
    readonly notILike: ValueString

    @Field({ nullable: true })
    readonly notIn: ValueArrayString

    @Field({ nullable: true })
    readonly notIRegexp: ValueArrayNumber

    @Field({ nullable: true })
    readonly notLike: ValueString

    @Field({ nullable: true })
    readonly notRegexp: ValueArrayNumber

    @Field({ nullable: true })
    readonly or: string

    @Field({ nullable: true })
    readonly overlap: ValueArrayNumber

    @Field({ nullable: true })
    readonly placeholder: ValueBoolean

    @Field({ nullable: true })
    readonly regexp: ValueArrayNumber

    @Field({ nullable: true })
    readonly startsWith: ValueString

    @Field({ nullable: true })
    readonly strictLeft: ValueArrayNumber

    @Field({ nullable: true })
    readonly strictRight: ValueArrayNumber

    @Field({ nullable: true })
    readonly substring: ValueString

    @Field({ nullable: true })
    readonly values: ValueArrayString
}

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

export const QueryOptions = (filter: WhereOptions, options?: Options): object => {
    return {
        where: filter,
        limit: options?.limit,
        offset: options?.offset,
        order: OptionsOrder(options?.orderBy)
    }
}