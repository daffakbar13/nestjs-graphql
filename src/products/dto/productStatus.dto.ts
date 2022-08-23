import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateProductStatusInput {
    static readonly KEY = 'createProductInput'

    @Field()
    n_status: string;
}

@InputType()
export class UpdateProductStatusInput extends PartialType(CreateProductStatusInput) {
    static readonly KEY = 'updateProductInput'
    @Field()
    id: number;
}

@InputType()
export class LimitProductStatus {
    static readonly KEY = 'limitProductInput'

    @Field({ nullable: true })
    limit?: number

    @Field({ nullable: true })
    offset?: number
}

@InputType()
export class FindProductStatus {
    static readonly KEY = 'findProductInput'

    @Field({ nullable: true })
    i_id?: number

    @Field({ nullable: true })
    n_status?: string;

    @Field({ nullable: true })
    d_createdAt?: Date;

    @Field({ nullable: true })
    d_updatedAt?: Date;

    @Field({ nullable: true })
    d_deletedAt?: Date;
}