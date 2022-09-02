import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, DeletedAt, UpdatedAt } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
import { Product } from 'src/products/entities/product.entity';
import { Role } from 'src/auth/entities/role.entity';
import { Selling } from 'src/sellings/entities/selling.entity';
import { PaymentMethod } from 'src/payment_methods/entities/payment_method.entity';

@Table({
  tableName: 'users',
  freezeTableName: true
})
@ObjectType()
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field({ nullable: true })
  public readonly i_id: number;

  @ForeignKey(() => Role)
  @Column({})
  @Field()
  public readonly i_rolesId: number;

  @BelongsTo(() => Role)
  public readonly role: Role;

  @Column({ type: DataType.TEXT })
  @Field()
  public readonly n_name: string;

  @Column({ type: DataType.TEXT })
  @Field()
  public readonly n_email: string;

  @Column({ type: DataType.TEXT })
  public readonly n_password: string;

  @Column({ type: DataType.BOOLEAN })
  @Field()
  public readonly c_active: boolean;

  @CreatedAt
  @Field({ nullable: true })
  public readonly d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  public readonly d_updatedAt: Date;

  @Column({})
  @Field({ nullable: true })
  public readonly d_lastLoginAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  public readonly d_deletedAt: Date;

  @HasMany(() => Product, 'i_createdByUserId')
  public readonly productCreated: Product[]

  @HasMany(() => Product, 'i_updatedByUserId')
  public readonly productUpdated: Product[]

  @HasMany(() => Product, 'i_deletedByUserId')
  public readonly productDeleted: Product[]

  @HasMany(() => Brand, 'i_createdByUserId')
  public readonly brandCreated: Brand[]

  @HasMany(() => Brand, 'i_updatedByUserId')
  public readonly brandUpdated: Brand[]

  @HasMany(() => Brand, 'i_deletedByUserId')
  public readonly brandDeleted: Brand[]

  @HasMany(() => PaymentMethod, 'i_createdByUserId')
  public readonly paymentCreated: PaymentMethod[]

  @HasMany(() => PaymentMethod, 'i_updatedByUserId')
  public readonly paymentUpdated: PaymentMethod[]

  @HasMany(() => PaymentMethod, 'i_deletedByUserId')
  public readonly paymentDeleted: PaymentMethod[]

  @HasMany(() => Selling)
  public readonly selling: Selling[]
}

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  public readonly count: number

  @Field(() => [User], { nullable: 'itemsAndList' })
  public readonly rows: User[]
}