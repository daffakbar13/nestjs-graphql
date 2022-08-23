import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
import { ProductStatus } from './product_status.entity';

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
  @Field({ nullable: true })
  i_id: number

  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER })
  @Field({ nullable: true })
  i_brands_id: number;

  @BelongsTo(() => Brand)
  brand: Brand

  @ForeignKey(() => ProductStatus)
  @Column({ type: DataType.INTEGER })
  @Field({ nullable: true })
  i_product_status_id: number;

  @BelongsTo(() => ProductStatus)
  status: ProductStatus

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  n_product: string;

  @Column({ type: DataType.BIGINT })
  @Field({ nullable: true })
  n_stock: number;

  @Column({ type: DataType.BIGINT })
  @Field({ nullable: true })
  n_price: number;

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  n_photo: string;

  @CreatedAt
  @Field({ nullable: true })
  d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  d_deletedAt: Date;
}

@ObjectType()
export class ProductModel {
  @Field({ nullable: true })
  count: number

  @Field(() => [Product], { nullable: 'itemsAndList' })
  rows: Product[]
}