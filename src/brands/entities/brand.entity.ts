import { Field, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/auth/entities/user.entity';

@Table({
  tableName: 't_brand',
  paranoid: true
})
@ObjectType()
export class Brand extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field()
  readonly i_id: number;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  readonly i_createdByUserId: number;

  @ForeignKey(() => User)
  @Column({})
  @Field()
  readonly i_updatedByUserId: number;

  @ForeignKey(() => User)
  @Column({})
  @Field({ nullable: true })
  readonly i_deletedByUserId: number;

  @BelongsTo(() => User, 'i_deletedByUserId')
  static readonly deleteByUser: User;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_brand: string;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_photo: string;

  @Column({ type: DataType.BOOLEAN })
  @Field()
  readonly c_active: boolean;

  @CreatedAt
  @Field()
  readonly d_createdAt: Date;

  @UpdatedAt
  @Field()
  readonly d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  readonly d_deletedAt: Date;

  @BelongsTo(() => User, 'i_createdByUserId')
  static readonly createdByUser: User;

  @BelongsTo(() => User, 'i_updatedByUserId')
  static readonly updateByUser: User;

  @HasMany(() => Product)
  readonly products: Product[]
}

@ObjectType()
export class BrandModel {
  @Field()
  readonly count: number

  @Field(() => [Brand], { nullable: 'itemsAndList' })
  readonly rows: Brand[]
}