import { Field, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';
import { Selling } from 'src/sellings/entities/selling.entity';

@Table({
  tableName: 't_payment',
  paranoid: true
})
@ObjectType()
export class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field()
  readonly i_id: number;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  readonly i_createdByUserId: number;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  readonly i_updatedByUserId: number;

  @ForeignKey(() => User)
  @Column({})
  @Field({ nullable: true })
  readonly i_deletedByUserId: number;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_accountName: string;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_accountNumber: string;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_paymentMethod: string;

  @CreatedAt
  @Field()
  readonly d_createdAt: Date;

  @UpdatedAt
  @Field()
  readonly d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  readonly d_deletedAt: Date;

  @BelongsTo(() => User, 'i_createdByUserId')
  static readonly createdByUser: User;

  @BelongsTo(() => User, 'i_updatedByUserId')
  static readonly updatedByUser: User;

  @BelongsTo(() => User, 'i_deletedByUserId')
  static readonly deletedByUser: User;

  @HasMany(() => Selling, 'i_paymentId')
  readonly selling: Selling
}

@ObjectType()
export class PaymentModel {
  @Field()
  readonly count: number

  @Field((type) => [Payment], { nullable: 'itemsAndList' })
  readonly rows: Payment[]
}