import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';


@InputType()
export class FilterBrand {
    static readonly KEY = 'filterBrand'

    @Field({ nullable: true })
    @IsInt()
    readonly i_id?: number;

    @Field({ nullable: true })
    @IsInt()
    readonly i_createdByUserId?: number;

    @Field({ nullable: true })
    @IsInt()
    readonly i_updatedByUserId?: number;

    @Field({ nullable: true })
    @IsInt()
    readonly i_deletedByUserId?: number;

    @Field({ nullable: true })
    @IsString()
    readonly n_brand?: string;

    @Field({ nullable: true })
    @IsString()
    readonly n_photo?: string;

    @Field({ nullable: true })
    @IsBoolean()
    readonly c_active?: string;

    @Field({ nullable: true })
    @IsDate()
    readonly d_createdAt?: Date;

    @Field({ nullable: true })
    @IsDate()
    readonly d_updatedAt?: Date;
}
@InputType()
export class CreateBrand {
    static readonly KEY = 'createBrand'

    readonly i_createdByUserId: number;

    readonly i_updatedByUserId: number;

    @Field()
    @IsString()
    readonly n_brand: string;

    @Field()
    @IsString()
    readonly n_photo: string;

    @Field()
    @IsBoolean()
    readonly c_active: boolean;
}

@InputType()
export class UpdateBrand extends PartialType(CreateBrand) {
    static readonly KEY = 'updateBrand'

    readonly i_deletedByUserId?: number;

    @Field()
    readonly filter?: FilterBrand
}

@ArgsType()
export class ArgsBrand {
    @Field({ nullable: true })
    readonly options: Options

    @Field({ nullable: true })
    readonly filter: FilterBrand
}