import { Field, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';
import { PaymentMethod } from 'src/payment_methods/entities/payment_method.entity';
import { SellingAddress } from './selling-address.entity';
import { SellingProduct } from './selling-product.entity';

export enum SellingStatus {
  Pending = 'Pending',
  Proccess = 'Proccess',
  Delivered = 'Delivered',
  Canceled = 'Delivered'
}
@Table({
  tableName: 't_selling',
  updatedAt: false
})
@ObjectType()
export class Selling extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field()
  readonly i_id: number;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  readonly i_usersId: number;

  @ForeignKey(() => SellingAddress)
  @Column({})
  @Field()
  readonly i_sellingAddressId: number;

  @ForeignKey(() => PaymentMethod)
  @Column({})
  @Field()
  readonly i_paymentId: number;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_invoice: string;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_grandTotal: string;

  @Column({ type: DataType.ENUM({ values: Object.keys(SellingStatus) }) })
  @Field()
  readonly n_status: string;

  @CreatedAt
  @Field()
  readonly d_createdAt: Date;

  @BelongsTo(() => User)
  static readonly customer: User;

  @BelongsTo(() => SellingAddress)
  static readonly address: SellingAddress;

  @BelongsTo(() => PaymentMethod, 'i_paymentId')
  static readonly payment: PaymentMethod;

  @HasMany(() => SellingProduct)
  readonly product: SellingProduct
}

@ObjectType()
export class SellingModel {
  @Field()
  readonly count: number

  @Field(() => [Selling], { nullable: 'itemsAndList' })
  readonly rows: Selling[]
}