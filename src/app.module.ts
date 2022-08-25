import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join, resolve } from 'path';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { Product } from './products/entities/product.entity';
import { Brand } from './brands/entities/brand.entity';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { PaymentsModule } from './payments/payments.module';
import { SellingsModule } from './sellings/sellings.module';
import { StatusSellingsModule } from './status_sellings/status_sellings.module';
import { config } from 'dotenv'
import { ProductStatus } from './products/entities/product-status.entity';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/entities/role.entity';
import { User } from './users/entities/user.entity';

config({ path: resolve(__dirname, '../.env') })

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
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
      sync: { alter: false },
      synchronize: true,
    }),
    ProductsModule,
    BrandsModule,
    AuthModule,
    RolesModule,
    UsersModule,
    // LoggerModule,
    // PaymentsModule,
    // SellingsModule,
    // StatusSellingsModule,
  ],
})
export class AppModule { }
