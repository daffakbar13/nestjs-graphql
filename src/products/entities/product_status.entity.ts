import { ObjectType, Field } from '@nestjs/graphql';
import { Table, Column, DataType, HasMany, Model, CreatedAt, DeletedAt, UpdatedAt, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';

@Table({
  tableName: 'm_product_status',
  freezeTableName: true,
  paranoid: true
})
@ObjectType()
export class ProductStatus extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field({ nullable: true })
  i_id: number

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  n_status: string;

  @CreatedAt
  @Field({ nullable: true })
  d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  d_deletedAt: Date;

  @HasMany(() => Product)
  product: Product[]
}

@ObjectType()
export class ProductStatusModel {
  @Field({ nullable: true })
  count: number

  @Field(() => [ProductStatus], { nullable: 'itemsAndList' })
  rows: ProductStatus[]
}