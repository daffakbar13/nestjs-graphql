import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserModel } from 'src/auth/entities/user.entity';
import { LoginDto, RegisterUser } from './dto/auth.dto';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Role, RoleModel } from 'src/auth/entities/role.entity';
import { WhereOptions } from 'sequelize';
import { CreateRole, FilterRole, UpdateRole } from 'src/auth/dto/role.dto';
import { CreateUser, FilterUser, UpdateUser } from './dto/user.dto';
import { Options, QueryOptions } from 'src/utils/options';
import { RoleRepository, UserRepository } from './auth.repository';

config({ path: resolve(__dirname, '../../.env') })

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) { }

  public async create(input: CreateUser): Promise<UserModel> {
    return this.repository.create(input)
  }

  public async findAll(filter: FilterUser, options?: Options): Promise<UserModel> {
    return this.repository.findAll(filter as WhereOptions, options)
  }

  public async update(input: UpdateUser): Promise<UserModel> {
    return this.repository.update(input)
  }

  public async remove(filter: FilterUser): Promise<UserModel> {
    return this.repository.remove(filter as WhereOptions)
  }
}

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) { }

  public async create(input: CreateRole): Promise<RoleModel> {
    return this.repository.create(input)
  }

  public async findAll(filter: FilterRole, options?: Options): Promise<RoleModel> {
    return this.repository.findAll(filter as WhereOptions, options)
  }

  public async update(input: UpdateRole): Promise<RoleModel> {
    return this.repository.update(input)
  }

  public async remove(filter: FilterRole): Promise<RoleModel> {
    return this.repository.remove(filter as WhereOptions)
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) { }

  public async register(body: RegisterUser, role: 'Customer' | 'Admin' | 'Super Admin'): Promise<UserModel> {
    const { name, email, password } = body;
    const user = await this.userService.findAll({ n_email: email })
    const roles = (await this.roleService.findAll({ n_role: role })).rows[0]

    const input: CreateUser = {
      i_rolesId: roles.i_id,
      n_name: name,
      n_email: email,
      n_password: this.encodePassword(password),
      c_active: true,
    }

    if (user.count != 0) { throw new HttpException('Email is already exist', HttpStatus.CONFLICT); }

    return await this.userService.create(input)
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = (await this.userService.findAll({ n_email: email })).rows[0]

    if (!user) { throw new HttpException('Email or password is incorrect', HttpStatus.UNAUTHORIZED) }

    const isPasswordValid: boolean = this.isPasswordValid(password, user?.n_password);

    if (!isPasswordValid) { throw new HttpException('Email or password is incorrect', HttpStatus.UNAUTHORIZED); }

    await this.userService.update({ id: user.i_id, d_lastLoginAt: new Date() })

    return this.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    await this.userService.update({ id: user.i_id, d_lastLoginAt: new Date() },)

    return this.generateToken(user);
  }

  public async getUserByToken(token: string): Promise<User> {
    const decodeToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET, })

    return (await this.userService.findAll({ n_email: decodeToken.email })).rows[0]
  }

  public async getRoleByUser(filter: FilterRole): Promise<Role> {
    return (await this.roleService.findAll(filter)).rows[0]
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return (await this.userService.findAll({ n_email: decoded.id })).rows[0]
  }

  // Generate JWT Token
  private generateToken(user: User): string {
    return this.jwtService.sign({ id: user.id, email: user.n_email });
  }

  // Validate User's password
  private isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  private encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

}