import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class CreateBrand {
    static readonly KEY = 'createBrand'

    @Field()
    @IsString()
    public readonly n_brand: string;

    @Field()
    @IsString()
    public readonly n_photo: string;

    @Field()
    @IsBoolean()
    public readonly c_active: string;
}

@InputType()
export class UpdateBrand extends PartialType(CreateBrand) {
    static readonly KEY = 'updateBrand'
    @Field()
    @IsInt()
    public readonly id: number;
}

@InputType()
export class FilterBrand {
    @Field({ nullable: true })
    @IsInt()
    public readonly i_id?: number;

    @Field({ nullable: true })
    @IsString()
    public readonly n_brand?: string;

    @Field({ nullable: true })
    @IsString()
    public readonly n_photo?: string;

    @Field({ nullable: true })
    @IsBoolean()
    public readonly c_active?: string;

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
export class ArgsBrand {
    @Field({ nullable: true })
    public readonly options: Options

    @Field({ nullable: true })
    public readonly filter: FilterBrand
}