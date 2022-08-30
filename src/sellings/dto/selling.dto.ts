import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreateSelling {
    static readonly KEY = 'createSelling'

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
    public readonly n_SellingMethod: string;
}

@InputType()
export class UpdateSelling extends PartialType(CreateSelling) {
    static readonly KEY = 'updateSelling'
    @Field()
    @IsInt()
    public readonly id?: number;
}

@InputType()
export class FilterSelling {
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
    public readonly n_SellingMethod?: string;

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
export class ArgsSelling {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterSelling
}