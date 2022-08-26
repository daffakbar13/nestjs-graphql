import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';
// import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UsersModule { }
