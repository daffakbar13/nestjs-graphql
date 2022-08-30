import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreatePayment {
    static readonly KEY = 'createPayment'

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
    public readonly n_paymentMethod: string;
}

@InputType()
export class UpdatePayment extends PartialType(CreatePayment) {
    static readonly KEY = 'updatePayment'
    @Field()
    @IsInt()
    public readonly id?: number;
}

@InputType()
export class FilterPayment {
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
    public readonly n_paymentMethod?: string;

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
export class ArgsPayment {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterPayment
}