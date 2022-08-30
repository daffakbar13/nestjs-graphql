import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/auth/entities/user.entity';
import { AuthResolver } from './auth.resolver';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Role } from 'src/auth/entities/role.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedRoleUser, SeedRoleAdmin, SeedRoleSuperAdmin } from 'src/_seeders/roles/role.seeder';
import { SeedUser, SeedAdmin, SeedSuperAdmin } from 'src/_seeders/users/user.seeder';

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
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }