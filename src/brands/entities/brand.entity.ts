import { Field, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';

@Table({
  tableName: 't_brand',
  freezeTableName: true,
  paranoid: true
})
@ObjectType()
export class Brand extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field({ nullable: true })
  i_id: number

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  n_brand: string;

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  n_photo: string;

  @Column({ type: DataType.BOOLEAN })
  @Field({ nullable: true })
  c_active: boolean;

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
  products: Product[]
}

@ObjectType()
export class BrandModel {
  @Field({ nullable: true })
  count: number

  @Field(() => [Brand], { nullable: 'itemsAndList' })
  rows: Brand[]
}