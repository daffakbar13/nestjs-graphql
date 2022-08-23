import { Field, Int } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Selling } from './selling.entity';

@Table({
    tableName: 't_selling_product',
    freezeTableName: true,
    timestamps: false
})
export class SellingProduct extends Model {
    @ForeignKey(() => Selling)
    @Column({ type: DataType.INTEGER })
    @Field(() => Int)
    i_sellings_id: number;

    @BelongsTo(() => Selling)
    sellings: Selling

    @Column({ type: DataType.TEXT })
    @Field()
    n_product: string;

    @Column({ type: DataType.TEXT })
    @Field()
    n_brand: string;

    @Column({ type: DataType.BIGINT })
    @Field(() => Int)
    n_quantity: number;

    @Column({ type: DataType.BIGINT })
    @Field(() => Int)
    n_price: number;

    @Column({ type: DataType.BIGINT })
    @Field(() => Int)
    n_total: number;

    @Column({ type: DataType.TEXT })
    @Field()
    n_photo: string;
}