import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class ValueString {
    @Field()
    readonly column: string

    @Field()
    readonly value: string
}

@InputType()
export class ValueNumber {
    @Field()
    readonly column: string

    @Field()
    readonly value: number
}

@InputType()
export class ValueBoolean {
    @Field()
    readonly column: string

    @Field({ nullable: true })
    readonly value: boolean
}

@InputType()
export class ValueArrayString {
    @Field()
    readonly column: string

    @Field(() => [String])
    readonly value: string[]
}

@InputType()
export class ValueArrayNumber {
    @Field()
    readonly column: string

    @Field(() => [Number])
    readonly value: number[]
}

@InputType()
export class ValueFunction {
    @Field()
    readonly column: string

    @Field()
    readonly function: string

    @Field()
    readonly value: number
}