import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany, AutoIncrement, CreatedAt, DeletedAt, PrimaryKey, UpdatedAt } from 'sequelize-typescript';
import Permissions from 'src/auth/permissions/index.permissions';
import { User } from 'src/auth/entities/user.entity';

@Table({
  tableName: 'roles',
  freezeTableName: true
})
@ObjectType()
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({})
  @Field({ nullable: true })
  i_id: number

  @Column({ type: DataType.TEXT })
  @Field()
  n_role: string;

  @Column({ type: DataType.ARRAY(DataType.ENUM({ values: Object.keys(Permissions) })) })
  readonly permissions: Permissions[]

  @CreatedAt
  @Field({ nullable: true })
  d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  d_updatedAt: Date;

  @HasMany(() => User)
  users: User[]
}

@ObjectType()
export class RoleModel {
  @Field()
  public readonly count: number

  @Field(() => [Role], { nullable: 'itemsAndList' })
  public readonly rows: Role[]
}