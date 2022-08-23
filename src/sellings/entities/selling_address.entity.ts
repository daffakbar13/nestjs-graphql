import { Field } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Selling } from './selling.entity';

@Table({
    tableName: 't_selling_address',
    freezeTableName: true,
    timestamps: false
})
export class SellingAddress extends Model {
    @Column({ type: DataType.TEXT })
    @Field()
    n_name: string;

    @Column({ type: DataType.TEXT })
    @Field()
    n_phone: string;

    @Column({ type: DataType.TEXT })
    @Field()
    n_address: string;

    @HasMany(() => Selling)
    sellings: Selling[]
}