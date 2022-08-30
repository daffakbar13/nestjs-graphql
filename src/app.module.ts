import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join, resolve } from 'path';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { Product } from './products/entities/product.entity';
import { Brand } from './brands/entities/brand.entity';
import { config } from 'dotenv'
import { ProductStatus } from './products/entities/product-status.entity';
import { AuthModule } from './auth/auth.module';
import { Role } from './auth/entities/role.entity';
import { User } from './auth/entities/user.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Dialect } from 'sequelize/types';
import { SellingsModule } from './sellings/sellings.module';
import { PaymentsModule } from './payments/payments.module';

config({ path: resolve(__dirname, '../.env') })

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        Product,
        Brand,
        ProductStatus,
        Role,
        User
      ],
      autoLoadModels: true,
      // sync: { alter: { drop: true }, force: true },
      synchronize: true,
    }),
    SeederModule.forRoot({
      isGlobal: true,
      runOnlyIfTableIsEmpty: true
    }),
    ProductsModule,
    BrandsModule,
    AuthModule,
    SellingsModule,
    PaymentsModule,
  ],
})
export class AppModule { }
