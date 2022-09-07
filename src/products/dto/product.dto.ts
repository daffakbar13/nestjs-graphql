import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsInt, IsString, MaxLength } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class FilterProduct {
    static readonly KEY = 'filterProduct'
    @Field({ nullable: true })
    readonly i_id?: number;

    @Field({ nullable: true })
    readonly i_brandId?: number;

    @Field({ nullable: true })
    readonly i_productStatusId?: number;

    @Field({ nullable: true })
    readonly n_product?: string;

    @Field({ nullable: true })
    readonly n_stock?: number;

    @Field({ nullable: true })
    readonly n_price?: number;

    @Field({ nullable: true })
    readonly n_photo?: string;

    @Field({ nullable: true })
    readonly d_createdAt?: Date;

    @Field({ nullable: true })
    readonly d_updatedAt?: Date;

    @Field({ nullable: true })
    readonly d_deletedAt?: Date;
}
@InputType()
export class CreateProduct {
    static readonly KEY = 'createProduct'

    readonly i_createdByUserId: number;

    readonly i_updatedByUserId: number;

    @Field()
    @IsInt()
    readonly i_brandId: number;

    @Field()
    @IsInt()
    readonly i_productStatusId: number;

    @Field()
    @IsString()
    @MaxLength(16)
    readonly n_product: string;

    @Field()
    @IsInt()
    readonly n_stock: number;

    @Field()
    @IsInt()
    readonly n_price: number;

    @Field()
    @IsString()
    readonly n_photo: string;

    @Field({ nullable: true })
    readonly d_scheduleTime: Date;
}

@InputType()
export class UpdateProduct extends PartialType(CreateProduct) {
    static readonly KEY = 'updateProduct'

    readonly i_deletedByUserId?: number

    @Field()
    readonly filter?: FilterProduct
}

@ArgsType()
export class ArgsProduct {
    @Field({ nullable: true })
    readonly options: Options

    @Field({ nullable: true })
    readonly filter: FilterProduct
}