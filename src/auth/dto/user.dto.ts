import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { Options } from 'prettier';

@InputType()
export class CreateUser {
    static readonly KEY = 'createUser'

    @Field()
    public readonly i_rolesId: number;

    @Field()
    public readonly n_name: string;

    @Field()
    public readonly n_email: string;

    @Field()
    public readonly n_password: string;

    @Field()
    public readonly c_active: boolean;
}

@InputType()
export class UpdateUser extends PartialType(CreateUser) {
    static readonly KEY = 'updateUser'
    @Field()
    public readonly id?: number;

    @Field({ nullable: true })
    public readonly d_lastLoginAt?: Date;
}
@InputType()
export class FilterUser {
    static readonly KEY = 'findUserInput'

    @Field({ nullable: true })
    public readonly i_id?: number;

    @Field({ nullable: true })
    public readonly i_roles_id?: number;

    @Field({ nullable: true })
    public readonly n_name?: string;

    @Field({ nullable: true })
    public readonly n_email?: string;

    @Field({ nullable: true })
    public readonly c_active?: boolean;

    @Field({ nullable: true })
    public readonly d_createdAt?: Date;

    @Field({ nullable: true })
    public readonly d_updatedAt?: Date;
}

@ArgsType()
export class ArgsUser {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterUser
}