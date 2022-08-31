import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreateSellingAddress {
    static readonly KEY = 'createSellingAddress'

    @Field()
    readonly n_name: string;

    @Field()
    readonly n_phone: string;

    @Field()
    readonly n_address: string;
}

@InputType()
export class UpdateSellingAddress extends PartialType(CreateSellingAddress) {
    static readonly KEY = 'updateSellingAddress'
    @Field()
    @IsInt()
    public readonly id?: number;
}

@InputType()
export class FilterSellingAddress {
    @Field({ nullable: true })
    @IsInt()
    public readonly i_id?: number;

    @Field()
    @IsString()
    public readonly n_accountName?: string;

    @Field()
    @IsString()
    public readonly n_accountNumber?: string;

    @Field()
    @IsString()
    public readonly n_SellingAddressMethod?: string;

    @Field({ nullable: true })
    @IsDate()
    public readonly d_createdAt?: Date;

    @Field({ nullable: true })
    @IsDate()
    public readonly d_updatedAt?: Date;

    @Field({ nullable: true })
    @IsDate()
    public readonly d_deletedAt?: Date;
}

@ArgsType()
export class ArgsSellingAddress {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterSellingAddress
}