import { InputType, Field, PartialType, ArgsType, OmitType, PickType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString, MaxLength } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreateProductStatus {
    static readonly KEY = 'createProductStatus'

    @Field()
    @IsString()
    @MaxLength(16)
    public readonly n_status: string;
}

@InputType()
export class UpdateProductStatus extends PartialType(CreateProductStatus) {
    static readonly KEY = 'updateProduct'

    @Field()
    @IsInt()
    public readonly id?: number;
}

@InputType()
export class FilterProductStatus {
    @Field({ nullable: true })
    @IsInt()
    public readonly i_id?: number;

    @Field({ nullable: true })
    @IsString()
    public readonly n_status?: string;

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
export class ArgsProductStatus {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterProductStatus
}