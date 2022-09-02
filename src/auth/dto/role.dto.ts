import { InputType, Field, PartialType, ArgsType, OmitType, PickType } from '@nestjs/graphql';
import { IsArray, IsDate, IsInt, IsString, MaxLength } from 'class-validator';
import { Options } from 'src/utils/options';
import Permissions from '../permissions/index.permissions';

@InputType()
export class CreateRole {
    static readonly KEY = 'createRole'

    @Field({ nullable: true })
    @IsString()
    public readonly n_role?: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    @IsArray()
    public readonly permissions?: string[]
}

@InputType()
export class UpdateRole extends PartialType(CreateRole) {
    static readonly KEY = 'updateRole'
    @Field()
    @IsInt()
    public readonly id?: number;
}

@InputType()
export class FilterRole {
    @Field({ nullable: true })
    @IsInt()
    public readonly i_id?: number;

    @Field({ nullable: true })
    @IsString()
    readonly n_role?: string

    @Field(() => [String], { nullable: true })
    @IsArray()
    readonly permissions?: string[]

    @Field({ nullable: true })
    @IsDate()
    public readonly d_createdAt?: Date;

    @Field({ nullable: true })
    @IsDate()
    public readonly d_updatedAt?: Date;
}

@ArgsType()
export class ArgsRole {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterRole
}