import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'roles',
  freezeTableName: true
})
@ObjectType()
export class Role extends Model {
  @Column({ type: DataType.TEXT })
  @Field()
  n_role: string;

  @HasMany(() => User)
  users: User[]
}