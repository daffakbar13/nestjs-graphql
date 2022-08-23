import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'logger',
  freezeTableName: true
})
@ObjectType()
export class Logger extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  i_users_id: number;
  @BelongsTo(() => User)
  user: User

  @Column({ type: DataType.TEXT })
  @Field()
  n_url: string;

  @Column({ type: DataType.TEXT })
  @Field()
  n_method: string;
}