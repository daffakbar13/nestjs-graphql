import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, Token } from './dto/auth.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => User)
  @UseInterceptors(ClassSerializerInterceptor)
  register(
    @Args(RegisterDto.KEY) body: RegisterDto
  ): Promise<User | never> {
    return this.authService.register(body)
  }

  @Mutation(() => Token)
  async login(
    @Args(LoginDto.KEY) body: LoginDto
  ) {
    return { token: await this.authService.login(body) }
  }
}
