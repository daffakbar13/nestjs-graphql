import { Field, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Selling } from './selling.entity';

@Table({
    tableName: 't_selling_address',
    paranoid: true,
    timestamps: false
})
@ObjectType()
export class SellingAddress extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({})
    @Field()
    readonly i_id: number;

    @Column({ type: DataType.TEXT })
    @Field()
    readonly n_name: string;

    @Column({ type: DataType.TEXT })
    @Field()
    readonly n_phone: string;

    @Column({ type: DataType.TEXT })
    @Field()
    readonly n_address: string;

    @HasMany(() => Selling)
    readonly selling: Selling
}

@ObjectType()
export class SellingAddressModel {
    @Field()
    readonly count: number

    // @Field(() => [SellingAddress], { nullable: 'itemsAndList' })
    // readonly rows: SellingAddress[]
}