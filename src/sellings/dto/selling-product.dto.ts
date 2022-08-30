import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreateSellingProduct {
    static readonly KEY = 'createSellingProduct'

    public readonly i_createdByUserId: number;

    public readonly i_updatedByUserId: number;

    @Field()
    @IsString()
    public readonly n_accountName: string;

    @Field()
    @IsString()
    public readonly n_accountNumber: string;

    @Field()
    @IsString()
    public readonly n_SellingProductMethod: string;
}

@InputType()
export class UpdateSellingProduct extends PartialType(CreateSellingProduct) {
    static readonly KEY = 'updateSellingProduct'
    @Field()
    @IsInt()
    public readonly id?: number;
}

@InputType()
export class FilterSellingProduct {
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
    public readonly n_SellingProductMethod?: string;

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
export class ArgsSellingProduct {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterSellingProduct
}