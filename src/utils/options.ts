import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class Options {
    static readonly KEY = 'options'

    @Field({ nullable: true })
    public readonly limit?: number

    @Field({ nullable: true })
    public readonly offset?: number
}