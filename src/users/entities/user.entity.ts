import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, DeletedAt, UpdatedAt } from 'sequelize-typescript';
import { Logger } from 'src/logger/entities/logger.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Selling } from 'src/sellings/entities/selling.entity';

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
  i_id: number

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  @Field()
  i_roles_id: number;

  @BelongsTo(() => Role)
  role: Role

  @Column({ type: DataType.TEXT })
  @Field()
  n_name: string;

  @Column({ type: DataType.TEXT })
  @Field()
  n_email: string;

  @Column({ type: DataType.TEXT })
  @Field()
  n_password: string;

  @Column({ type: DataType.BOOLEAN })
  @Field()
  c_active: boolean;

  @CreatedAt
  @Field({ nullable: true })
  d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  d_updatedAt: Date;

  @Column({})
  @Field({ nullable: true })
  d_lastLoginAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  d_deletedAt: Date;

  // @HasMany(() => Selling)
  // Sellings: Selling[]

  // @HasMany(() => Logger)
  // logs: Logger[]
}

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  count: number

  @Field(() => [User], { nullable: 'itemsAndList' })
  rows: User[]
}