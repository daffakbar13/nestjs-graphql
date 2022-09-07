import { Field, InputType } from "@nestjs/graphql"
import { ValueArrayNumber, ValueArrayString, ValueBoolean, ValueFunction, ValueNumber, ValueString } from "./operator-hints"

@InputType()
export class Operator {
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