import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, DeletedAt, UpdatedAt } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
import { Product } from 'src/products/entities/product.entity';
import { Role } from 'src/auth/entities/role.entity';

@Table({
  tableName: 'users',
  freezeTableName: true
})
@ObjectType()
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field({ nullable: true })
  readonly i_id: number;

  @ForeignKey(() => Role)
  @Column({})
  @Field()
  readonly i_roles_id: number;

  @BelongsTo(() => Role)
  readonly role: Role;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_name: string;

  @Column({ type: DataType.TEXT })
  @Field()
  readonly n_email: string;

  @Column({ type: DataType.TEXT })
  readonly n_password: string;

  @Column({ type: DataType.BOOLEAN })
  @Field()
  readonly c_active: boolean;

  @CreatedAt
  @Field({ nullable: true })
  readonly d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  readonly d_updatedAt: Date;

  @Column({})
  @Field({ nullable: true })
  readonly d_lastLoginAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  readonly d_deletedAt: Date;

  @HasMany(() => Product, 'i_createdByUserId')
  readonly productCreated: Product[]

  @HasMany(() => Product, 'i_updatedByUserId')
  readonly productUpdated: Product[]

  @HasMany(() => Product, 'i_deletedByUserId')
  readonly productDeleted: Product[]

  @HasMany(() => Brand, 'i_createdByUserId')
  readonly brandCreated: Brand[]

  @HasMany(() => Brand, 'i_updatedByUserId')
  readonly brandUpdated: Brand[]

  @HasMany(() => Brand, 'i_deletedByUserId')
  readonly brandDeleted: Brand[]

  // @HasMany(() => Logger)
  // logs: Logger[]
}

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  readonly count: number

  @Field(() => [User], { nullable: 'itemsAndList' })
  readonly rows: User[]
}