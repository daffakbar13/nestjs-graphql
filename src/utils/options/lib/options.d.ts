import { Field, InputType } from "@nestjs/graphql"
import { Operator } from "./operator"
import { Order } from "./order"

@InputType()
declare class Options {
    @Field({ nullable: true })
    readonly limit?: number

    @Field({ nullable: true })
    readonly offset?: number

    @Field({ nullable: true })
    readonly orderBy?: Order

    @Field({ nullable: true })
    readonly operator?: Operator
}