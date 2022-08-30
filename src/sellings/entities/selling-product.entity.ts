import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, Unique } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
import { User } from 'src/auth/entities/user.entity';
import { Selling } from './selling.entity';

@Table({
    tableName: 't_selling_product',
    freezeTableName: true,
    paranoid: true,
    timestamps: false
})
@ObjectType()
export class SellingProduct extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({})
    @Field()
    readonly i_id: number;

    @ForeignKey(() => Selling)
    @Column({})
    @Field()
    readonly i_sellingId: number;

    @Column({ type: DataType.TEXT })
    @Field()
    readonly n_product: string;

    @Column({ type: DataType.TEXT })
    @Field()
    readonly n_brand: string;

    @Column({ type: DataType.BIGINT })
    @Field()
    readonly n_quantity: number;

    @Column({ type: DataType.BIGINT })
    @Field()
    readonly n_price: number;

    @Column({ type: DataType.BIGINT })
    @Field()
    readonly total: number;

    @Column({ type: DataType.TEXT })
    @Field()
    readonly n_photo: string;

    @BelongsTo(() => User)
    static readonly createdByUser: User;
}

@ObjectType()
export class SellingProductModel {
    @Field()
    readonly count: number

    @Field(() => [SellingProduct], { nullable: 'itemsAndList' })
    readonly rows: SellingProduct[]
}