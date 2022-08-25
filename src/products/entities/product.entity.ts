import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
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
  @Field({ nullable: true })
  public readonly i_id?: number;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER })
  @Field({ nullable: true })
  public readonly i_brands_id?: number;

  @BelongsTo(() => Brand)
  static readonly brand?: Brand;

  @ForeignKey(() => ProductStatus)
  @Column({ type: DataType.INTEGER })
  @Field({ nullable: true })
  public readonly i_product_status_id?: number;

  @BelongsTo(() => ProductStatus)
  public readonly status?: ProductStatus;

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  public readonly n_product?: string;

  @Column({ type: DataType.BIGINT })
  @Field({ nullable: true })
  public readonly n_stock?: number;

  @Column({ type: DataType.BIGINT })
  @Field({ nullable: true })
  public readonly n_price?: number;

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  public readonly n_photo?: string;

  @CreatedAt
  @Field({ nullable: true })
  public readonly d_createdAt?: Date;

  @UpdatedAt
  @Field({ nullable: true })
  public readonly d_updatedAt?: Date;

  @DeletedAt
  @Field({ nullable: true })
  public readonly d_deletedAt?: Date;
}

@ObjectType()
export class ProductModel {
  @Field({ nullable: true })
  public readonly count: number

  @Field(() => [Product], { nullable: 'itemsAndList' })
  public readonly rows: Product[]
}