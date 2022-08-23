import { InputType, Int, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
    @Field()
    n_brand: string;

    @Field()
    n_photo: string;

    @Field()
    c_active: boolean;
}

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
    static readonly KEY = 'updateBrandInput'

    @Field(() => Int)
    id: number;
}

@InputType()
export class LimitBrand {
    static readonly KEY = 'limitBrand'

    @Field({ nullable: true })
    limit?: number

    @Field({ nullable: true })
    offset?: number
}

@InputType()
export class FindBrand {
    static readonly KEY = 'findBrand'

    @Field({ nullable: true })
    i_id?: number;

    @Field({ nullable: true })
    n_brand?: string;

    @Field({ nullable: true })
    n_photo?: string;

    @Field({ nullable: true })
    c_active?: boolean;

    @Field({ nullable: true })
    d_createdAt?: Date;

    @Field({ nullable: true })
    d_updatedAt?: Date;

    @Field({ nullable: true })
    d_deletedAt?: Date;
}