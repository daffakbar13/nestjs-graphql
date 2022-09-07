import { Field, InputType } from "@nestjs/graphql"

@InputType()
declare class ValueString {
    @Field()
    readonly column: string

    @Field()
    readonly value: string
}

@InputType()
declare class ValueNumber {
    @Field()
    readonly column: string

    @Field()
    readonly value: number
}

@InputType()
declare class ValueBoolean {
    @Field()
    readonly column: string

    @Field({ nullable: true })
    readonly value: boolean
}

@InputType()
declare class ValueArrayString {
    @Field()
    readonly column: string

    @Field(() => [String])
    readonly value: string[]
}

@InputType()
declare class ValueArrayNumber {
    @Field()
    readonly column: string

    @Field(() => [Number])
    readonly value: number[]
}

@InputType()
declare class ValueFunction {
    @Field()
    readonly column: string

    @Field()
    readonly function: string

    @Field()
    readonly value: number
}