import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Table, ForeignKey, Column, DataType, BelongsTo, HasMany, Model } from 'sequelize-typescript';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { SellingAddress } from './selling_address.entity';
import { SellingProduct } from './selling_product';
import { SellingStatus } from './selling_status.entity';

@Table({
  tableName: 't_selling',
  freezeTableName: true
})
@ObjectType()
export class Selling extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  i_users_id: number;

  @BelongsTo(() => User)
  customer: User

  @ForeignKey(() => SellingAddress)
  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  i_selling_address_id: number;

  @BelongsTo(() => SellingAddress)
  address: SellingAddress

  @ForeignKey(() => Payment)
  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  i_selling_payments_id: number;

  @BelongsTo(() => Payment)
  payment_method: Payment

  @ForeignKey(() => SellingStatus)
  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  i_selling_status_id: number;

  @BelongsTo(() => SellingStatus)
  status: SellingStatus

  @Column({ type: DataType.TEXT })
  @Field()
  n_invoice: string;

  @Column({ type: DataType.BIGINT })
  @Field()
  n_grand_total: number;

  @HasMany(() => SellingProduct)
  selling_products: SellingProduct[]
}
