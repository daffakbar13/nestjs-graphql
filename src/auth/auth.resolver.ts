import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User, UserModel } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterUser, Token } from './dto/auth.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => UserModel)
  protected async register(
    @Args(RegisterUser.KEY) input: RegisterUser
  ): Promise<UserModel> {
    return await this.authService.register(input)
  }

  @Mutation(() => Token)
  async login(
    @Args(LoginDto.KEY) input: LoginDto
  ) {
    return { token: await this.authService.login(input) }
  }
}
