import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Selling } from 'src/sellings/entities/selling.entity';

@Table({
  tableName: 'm_payment_methods',
  freezeTableName: true,
  paranoid: true
})
@ObjectType()
export class Payment extends Model {
  @Field()
  @Column({ type: DataType.TEXT })
  n_account_name: string;

  @Column({ type: DataType.TEXT })
  @Field()
  n_account_number: string;

  @Column({ type: DataType.TEXT })
  @Field()
  n_payment_method: string;

  @HasMany(() => Selling)
  sellings: Selling[]
}
