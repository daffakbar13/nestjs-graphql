import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, Unique } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductStatus } from './product-status.entity';

@Table({
  tableName: 't_product',
  freezeTableName: true,
  paranoid: true
})
@ObjectType()
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field()
  readonly i_id: number;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  readonly i_createdByUserId: number;

  @BelongsTo(() => User, 'i_createdByUserId')
  static readonly createdByUser: User;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  readonly i_updatedByUserId: number;

  @BelongsTo(() => User, 'i_updatedByUserId')
  static readonly updateByUser: User;

  @ForeignKey(() => User)
  @Column({})
  @Field({ nullable: true })
  readonly i_deletedByUserId: number;

  @BelongsTo(() => User, 'i_deletedByUserId')
  static readonly deleteByUser: User;

  @ForeignKey(() => Brand)
  @Column({})
  @Field()
  readonly i_brandId: number;

  @BelongsTo(() => Brand)
  static readonly brand: Brand;

  @ForeignKey(() => ProductStatus)
  @Column({})
  @Field()
  readonly i_productStatusId: number;

  @BelongsTo(() => ProductStatus)
  readonly status: ProductStatus;

  @Unique
  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_product: string;

  @Column({ type: DataType.BIGINT })
  @Field()
  readonly n_stock: number;

  @Column({ type: DataType.BIGINT })
  @Field()
  readonly n_price: number;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_photo: string;

  @Column({})
  @Field({ nullable: true })
  readonly d_scheduleTime: Date;

  @CreatedAt
  @Field()
  readonly d_createdAt: Date;

  @UpdatedAt
  @Field()
  readonly d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  readonly d_deletedAt: Date;
}

@ObjectType()
export class ProductModel {
  @Field()
  readonly count: number

  @Field(() => [Product], { nullable: 'itemsAndList' })
  readonly rows: Product[]
}