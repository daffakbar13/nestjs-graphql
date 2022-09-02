import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { User, UserModel } from 'src/auth/entities/user.entity';
import { BrandService } from 'src/brands/brands.service';
import { BrandModel } from 'src/brands/entities/brand.entity';
import { AuthService, RoleService } from './auth.service';
import { LoginDto, RegisterUser, Token } from './dto/auth.dto';
import { RoleModel } from './entities/role.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly brandService: BrandService
  ) { }

  // @Mutation(() => RoleModel)
  // protected async createRole(
  //   @Args(CreateRole.KEY) input: CreateRole
  // ): Promise<RoleModel> {
  //   return await this.roleService.create(input)
  // }

  @Mutation(() => UserModel)
  protected async registerCustomer(
    @Args(RegisterUser.KEY) input: RegisterUser
  ): Promise<UserModel> {
    return await this.authService.register(input, 'Customer')
  }

  @UseGuards()
  @Mutation(() => UserModel)
  protected async registerAdmin(
    @Args(RegisterUser.KEY) input: RegisterUser
  ): Promise<UserModel> {
    return await this.authService.register(input, 'Admin')
  }

  @Mutation(() => UserModel)
  protected async registerSuperAdmin(
    @Args(RegisterUser.KEY) input: RegisterUser
  ): Promise<UserModel> {
    return await this.authService.register(input, 'Super Admin')
  }

  @Mutation(() => Token)
  async login(
    @Args(LoginDto.KEY) input: LoginDto
  ) {
    return { token: await this.authService.login(input) }
  }

  @ResolveField(() => RoleModel)
  protected role(@Parent() user: User): Promise<RoleModel> {
    return this.roleService.findAll({ i_id: user.i_id })
  }

  @ResolveField(() => BrandModel)
  protected brandCreated(@Parent() user: User): Promise<BrandModel> {
    return this.brandService.findAll({ i_createdByUserId: user.i_id })
  }

  @ResolveField(() => BrandModel)
  protected brandUpdated(@Parent() user: User): Promise<BrandModel> {
    return this.brandService.findAll({ i_updatedByUserId: user.i_id })
  }

  @ResolveField(() => BrandModel)
  protected brandDeleted(@Parent() user: User): Promise<BrandModel> {
    return this.brandService.findAll({ i_deletedByUserId: user.i_id })
  }
}
