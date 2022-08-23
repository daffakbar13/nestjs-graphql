import { Field } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Selling } from './selling.entity';

@Table({
    tableName: 't_selling_status',
    freezeTableName: true,
    paranoid: true
})
export class SellingStatus extends Model {
    @Column({ type: DataType.TEXT })
    @Field()
    n_status: string;

    @HasMany(() => Selling)
    sellings: Selling[]
}