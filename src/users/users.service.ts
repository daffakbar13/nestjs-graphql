import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WhereOptions } from 'sequelize';
import { CreateUserInput, FindUser, LimitUser, UpdateUserInput } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  public create(createUserInput: CreateUserInput): Promise<User> {
    return this.userRepository.create(createUserInput);
  }

  public findAll(limitUser: LimitUser, findUser: FindUser): Promise<{ count: number; rows: User[] }> {
    if (limitUser == null) {
      limitUser = {}

    }
    if (findUser == null) {
      findUser = {}
    }

    return this.userRepository.findAll(limitUser, findUser as WhereOptions)
  }

  findOne(findUser: FindUser) {
    return this.userRepository.findOne(findUser);
  }

  update(updateUserInput: UpdateUserInput) {
    return this.userRepository.update(updateUserInput)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


}
