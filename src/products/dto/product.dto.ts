import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
    static readonly KEY = 'createProductInput'

    @Field({ nullable: true })
    i_brands_id: number;

    @Field({ nullable: true })
    i_product_status_id: number;

    @Field({ nullable: true })
    n_product: string;

    @Field({ nullable: true })
    n_stock: number;

    @Field({ nullable: true })
    n_price: number;

    @Field({ nullable: true })
    n_photo: string;
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    static readonly KEY = 'updateProductInput'
    @Field()
    id: number;
}

@InputType()
export class LimitProduct {
    static readonly KEY = 'limitProductInput'

    @Field({ nullable: true })
    limit?: number

    @Field({ nullable: true })
    offset?: number
}

@InputType()
export class FindProduct {
    static readonly KEY = 'findProductInput'

    @Field({ nullable: true })
    i_id?: number;

    @Field({ nullable: true })
    i_brands_id?: number;

    @Field({ nullable: true })
    i_product_status_id?: number;

    @Field({ nullable: true })
    n_product?: string;

    @Field({ nullable: true })
    n_stock?: number;

    @Field({ nullable: true })
    n_price?: number;

    @Field({ nullable: true })
    n_photo?: string;

    @Field({ nullable: true })
    d_createdAt?: Date;

    @Field({ nullable: true })
    d_updatedAt?: Date;

    @Field({ nullable: true })
    d_deletedAt?: Date;
}