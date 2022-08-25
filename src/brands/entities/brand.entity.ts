import { Field, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';

@Table({
  tableName: 't_brand',
  paranoid: true
})
@ObjectType()
export class Brand extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field({ nullable: true })
  public readonly i_id: number;

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  public readonly n_brand: string;

  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  public readonly n_photo: string;

  @Column({ type: DataType.BOOLEAN })
  @Field({ nullable: true })
  public readonly c_active: boolean;

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
  public readonly products: Product[]
}

@ObjectType()
export class BrandModel {
  @Field({ nullable: true })
  public readonly count: number

  @Field(() => [Brand], { nullable: 'itemsAndList' })
  public readonly rows: Brand[]
}