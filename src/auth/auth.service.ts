import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserModel } from 'src/auth/entities/user.entity';
import { LoginDto, RegisterUser } from './dto/auth.dto';
import { config } from 'dotenv';
import { resolve } from 'path';
import UserPermission from 'src/auth/permissions/customer.permissions';
import { Role } from 'src/auth/entities/role.entity';
import { WhereOptions } from 'sequelize';
import { FilterRole } from 'src/auth/dto/role.dto';
import { CreateUserInput, FilterUser, UpdateUserInput } from './dto/user.dto';
import { Options } from 'src/utils/options';
import { OptionsAuthorize } from 'src/utils/options-authorize';

config({ path: resolve(__dirname, '../../.env') })

@Injectable()
export class UserService {
  @InjectModel(User)
  private readonly user: typeof User;

  public async create(input: CreateUserInput): Promise<{ count: number; rows: User[] }> {
    const { i_rolesId, n_name, n_email, n_password, c_active } = input
    const data: CreateUserInput = {
      i_rolesId,
      n_name,
      n_email,
      n_password,
      c_active
    }
    const newUser = await this.user.create(data as any);

    return await this.findAll({ i_id: newUser.i_id })
  }

  public async findAll(filter: FilterUser, options?: Options): Promise<{ count: number; rows: User[] }> {
    return await this.user.findAndCountAll({
      where: OptionsAuthorize(filter),
      limit: options?.limit,
      offset: options?.offset
    })
  }

  public async update(input: UpdateUserInput): Promise<{ count: number; rows: User[] }> {
    const { id, i_rolesId, n_name, n_email, n_password, c_active, d_lastLoginAt } = input
    const data: UpdateUserInput = {
      i_rolesId,
      n_name,
      n_email,
      n_password,
      c_active,
      d_lastLoginAt
    }
    await this.user.update(data as any, { where: { i_id: id } })

    return await this.findAll({ i_id: id })

  }

  public async remove(filter: FilterUser): Promise<{ count: number; rows: User[] }> {
    const deletedUser = this.findAll(filter)
    await this.user.destroy({ where: filter as WhereOptions })

    return deletedUser
  }
}

@Injectable()
export class RoleService {
  @InjectModel(Role)
  private readonly role: typeof Role

  public async findAll(filter: FilterRole, options?: Options): Promise<{ count: number; rows: Role[] }> {
    return await this.role.findAndCountAll({
      where: OptionsAuthorize(filter),
      limit: options?.limit,
      offset: options?.offset
    })
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) { }

  public async register(body: RegisterUser): Promise<{ count: number, rows: User[] }> {
    const { name, email, password } = body;
    const user = await this.userService.findAll({ n_email: email })
    const input: CreateUserInput = {
      i_rolesId: 1,
      n_name: name,
      n_email: email,
      n_password: this.encodePassword(password),
      c_active: true,
    }

    if (user.count != 0) { throw new HttpException('Conflict', HttpStatus.CONFLICT); }

    return await this.userService.create(input)
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = (await this.userService.findAll({ n_email: email })).rows[0]
    const isPasswordValid: boolean = this.isPasswordValid(password, user.n_password);

    if (!isPasswordValid) { throw new HttpException('No user found', HttpStatus.NOT_FOUND); }

    await this.userService.update({ id: user.i_id, d_lastLoginAt: new Date() },)

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

  // Decoding the JWT Token
  private async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
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

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwtService.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}