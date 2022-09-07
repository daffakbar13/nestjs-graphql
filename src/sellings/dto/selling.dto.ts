import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString } from 'class-validator';
import { Options } from 'src/utils/options';

@InputType()
export class FilterSelling {
    @Field({ nullable: true })
    readonly i_id: number;

    @Field({ nullable: true })
    readonly i_usersId: number;

    @Field({ nullable: true })
    readonly i_sellingAddressId: number;

    @Field({ nullable: true })
    readonly i_paymentId: number;

    @Field({ nullable: true })
    readonly n_invoice: string;

    @Field({ nullable: true })
    readonly n_grandTotal: string;

    @Field({ nullable: true })
    readonly n_status: string;

    @Field({ nullable: true })
    readonly d_createdAt: Date;
}
@InputType()
export class CreateSelling {
    static readonly KEY = 'createSelling'

    readonly i_usersId: number;

    @Field()
    readonly i_sellingAddressId: number;

    @Field()
    readonly i_paymentId: number;

    @Field()
    readonly n_invoice: string;

    @Field()
    readonly n_grandTotal: number;

    @Field()
    readonly n_status: string;
}

@InputType()
export class UpdateSelling extends PartialType(CreateSelling) {
    static readonly KEY = 'updateSelling'

    @Field()
    readonly filter?: FilterSelling
}

@ArgsType()
export class ArgsSelling {
    @Field({ nullable: true })
    readonly options: Options

    @Field({ nullable: true })
    readonly filter: FilterSelling
}