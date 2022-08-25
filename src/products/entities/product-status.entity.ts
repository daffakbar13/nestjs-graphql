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
  public readonly i_id: number;

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  public readonly n_status: string;

  @CreatedAt
  @Field({ nullable: true })
  public readonly d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  public readonly d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  public readonly d_deletedAt: Date;

  @HasMany(() => Product)
  public readonly product: Product[];
}

@ObjectType()
export class ProductStatusModel {
  @Field({ nullable: true })
  public readonly count: number;

  @Field(() => [ProductStatus], { nullable: 'itemsAndList' })
  public readonly rows: ProductStatus[];
}