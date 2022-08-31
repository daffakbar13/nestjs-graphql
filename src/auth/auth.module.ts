import { Module } from '@nestjs/common';
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
  ],
  providers: [AuthService, UserService, RoleService, AuthResolver, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }