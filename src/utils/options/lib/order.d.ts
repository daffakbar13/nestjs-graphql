import { InputType, Field } from "@nestjs/graphql"

@InputType()
declare class Order {
    @Field(() => [String], { nullable: true })
    readonly ascending: string[]

    @Field(() => [String], { nullable: true })
    readonly descending: string[]
}