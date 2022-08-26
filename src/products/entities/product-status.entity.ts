import { ObjectType, Field } from '@nestjs/graphql';
import { Table, Column, DataType, HasMany, Model, CreatedAt, DeletedAt, UpdatedAt, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';

@Table({
  tableName: 'm_productStatus',
  freezeTableName: true
})
@ObjectType()
export class ProductStatus extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field()
  readonly i_id: number;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_status: string;

  @CreatedAt
  @Field()
  readonly d_createdAt: Date;

  @UpdatedAt
  @Field()
  readonly d_updatedAt: Date;

  @HasMany(() => Product)
  readonly product: Product[];
}

@ObjectType()
export class ProductStatusModel {
  @Field()
  readonly count: number;

  @Field(() => [ProductStatus], { nullable: 'itemsAndList' })
  readonly rows: ProductStatus[];
}