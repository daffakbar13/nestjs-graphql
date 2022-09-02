import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService, RoleService, UserService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/auth/entities/user.entity';
import { AuthResolver } from './auth.resolver';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Role } from 'src/auth/entities/role.entity';
import { BrandsModule } from 'src/brands/brands.module';
import { RoleRepository, UserRepository } from './auth.repository';

config({ path: resolve(__dirname, '../../.env') })
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES },
      }),
    }),
    SequelizeModule.forFeature([User, Role]),
    forwardRef(() => BrandsModule)
  ],
  providers: [
    AuthService,
    UserService,
    RoleService,
    AuthResolver,
    JwtStrategy,
    UserRepository,
    RoleRepository
  ],
  exports: [AuthService, UserService, RoleService]
})
export class AuthModule { }