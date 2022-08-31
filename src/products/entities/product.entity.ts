import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, Unique } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
import { User } from 'src/auth/entities/user.entity';
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
  public readonly i_id: number;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  public readonly i_createdByUserId: number;

  @BelongsTo(() => User, 'i_createdByUserId')
  public static readonly createdByUser: User;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  public readonly i_updatedByUserId: number;

  @BelongsTo(() => User, 'i_updatedByUserId')
  public static readonly updateByUser: User;

  @ForeignKey(() => User)
  @Column({})
  @Field({ nullable: true })
  public readonly i_deletedByUserId: number;

  @BelongsTo(() => User, 'i_deletedByUserId')
  public static readonly deleteByUser: User;

  @ForeignKey(() => Brand)
  @Column({})
  @Field()
  public readonly i_brandId: number;

  @BelongsTo(() => Brand)
  public static readonly brand: Brand;

  @ForeignKey(() => ProductStatus)
  @Column({})
  @Field()
  public readonly i_productStatusId: number;

  @BelongsTo(() => ProductStatus)
  public readonly status: ProductStatus;

  @Unique
  @Column({ type: DataType.TEXT })
  @Field()
  public readonly n_product: string;

  @Column({ type: DataType.BIGINT })
  @Field()
  public readonly n_stock: number;

  @Column({ type: DataType.BIGINT })
  @Field()
  public readonly n_price: number;

  @Column({ type: DataType.TEXT })
  @Field()
  public readonly n_photo: string;

  @Column({})
  @Field({ nullable: true })
  public readonly d_scheduleTime: Date;

  @CreatedAt
  @Field()
  public readonly d_createdAt: Date;

  @UpdatedAt
  @Field()
  public readonly d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  public readonly d_deletedAt: Date;
}

@ObjectType()
export class ProductModel {
  @Field()
  public readonly count: number

  @Field(() => [Product], { nullable: 'itemsAndList' })
  public readonly rows: Product[]
}