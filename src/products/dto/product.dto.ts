import { InputType, Field, PartialType, ArgsType, OmitType, PickType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString, MaxLength } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreateProduct {
    public static readonly KEY = 'createProduct'

    public readonly i_createdByUserId: number;

    public readonly i_updatedByUserId: number;

    @Field()
    @IsInt()
    public readonly i_brandId: number;

    @Field()
    @IsInt()
    public readonly i_productStatusId: number;

    @Field()
    @IsString()
    @MaxLength(16)
    public readonly n_product: string;

    @Field()
    @IsInt()
    public readonly n_stock: number;

    @Field()
    @IsInt()
    public readonly n_price: number;

    @Field()
    @IsString()
    public readonly n_photo: string;

    @Field({ nullable: true })
    public readonly d_scheduleTime: Date;
}

@InputType()
export class UpdateProduct extends PartialType(CreateProduct) {
    public static readonly KEY = 'updateProduct'

    @Field()
    @IsInt()
    public readonly id?: number;
}

@InputType()
export class FilterProduct {
    @Field({ nullable: true })
    public readonly i_id?: number;

    @Field({ nullable: true })
    public readonly i_brandId?: number;

    @Field({ nullable: true })
    public readonly i_productStatusId?: number;

    @Field({ nullable: true })
    public readonly n_product?: string;

    @Field({ nullable: true })
    public readonly n_stock?: number;

    @Field({ nullable: true })
    public readonly n_price?: number;

    @Field({ nullable: true })
    public readonly n_photo?: string;

    @Field({ nullable: true })
    public readonly d_createdAt?: Date;

    @Field({ nullable: true })
    public readonly d_updatedAt?: Date;

    @Field({ nullable: true })
    public readonly d_deletedAt?: Date;
}

@ArgsType()
export class ArgsProduct {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterProduct
}