import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreatePaymentMethod {
    static readonly KEY = 'createPaymentMethod'

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
export class UpdatePaymentMethod extends PartialType(CreatePaymentMethod) {
    static readonly KEY = 'updatePaymentMethod'
    @Field()
    @IsInt()
    public readonly id?: number;

    public readonly i_deletedByUserId?: number;
}

@InputType()
export class FilterPaymentMethod {
    @Field({ nullable: true })
    readonly i_id?: number;

    @Field({ nullable: true })
    readonly i_createdByUserId?: number;

    @Field({ nullable: true })
    readonly i_updatedByUserId?: number;

    @Field({ nullable: true })
    readonly i_deletedByUserId?: number;

    @Field({ nullable: true })
    readonly n_accountName?: string;

    @Field({ nullable: true })
    readonly n_accountNumber?: string;

    @Field({ nullable: true })
    readonly n_paymentMethod?: string;

    @Field({ nullable: true })
    readonly d_createdAt?: Date;

    @Field({ nullable: true })
    readonly d_updatedAt?: Date;

    @Field({ nullable: true })
    readonly d_deletedAt?: Date;
}

@ArgsType()
export class ArgsPaymentMethod {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterPaymentMethod
}