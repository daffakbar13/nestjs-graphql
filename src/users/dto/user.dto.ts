import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    static readonly KEY = 'createProductInput'

    @Field()
    i_roles_id: number;

    @Field()
    n_name: string;

    @Field()
    n_email: string;

    @Field()
    n_password: string;

    @Field()
    c_active: boolean;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    static readonly KEY = 'updateUserInput'
    @Field()
    id: number;

    @Field({ nullable: true })
    d_lastLoginAt?: Date;
}

@InputType()
export class LimitUser {
    static readonly KEY = 'limitUserInput'

    @Field({ nullable: true })
    limit?: number

    @Field({ nullable: true })
    offset?: number
}

@InputType()
export class FindUser {
    static readonly KEY = 'findUserInput'

    @Field({ nullable: true })
    i_id?: number;

    @Field()
    i_roles_id?: number;

    @Field()
    n_name?: string;

    @Field()
    n_email?: string;

    @Field()
    c_active?: boolean;

    @Field({ nullable: true })
    d_createdAt?: Date;

    @Field({ nullable: true })
    d_updatedAt?: Date;

    @Field({ nullable: true })
    d_deletedAt?: Date;
}