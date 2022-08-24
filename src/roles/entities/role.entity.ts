import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany, AutoIncrement, CreatedAt, DeletedAt, PrimaryKey, UpdatedAt } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

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

  @CreatedAt
  @Field({ nullable: true })
  d_createdAt: Date;

  @UpdatedAt
  @Field({ nullable: true })
  d_updatedAt: Date;

  @DeletedAt
  @Field({ nullable: true })
  d_deletedAt: Date;

  @HasMany(() => User)
  users: User[]
}