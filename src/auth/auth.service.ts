import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { CreateUserInput, UpdateUserInput } from 'src/users/dto/user.dto';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') })

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }
  @InjectModel(User)
  private readonly repository: typeof User;

  public async register(body: RegisterDto): Promise<User> {
    const { name, email, password } = body;

    let user = await this.userService.findAll(null, { n_email: email })

    if (user.count != 0) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    console.log(body);


    const input: CreateUserInput = {
      i_roles_id: 1,
      n_name: name,
      n_email: email,
      n_password: this.encodePassword(password),
      c_active: true,
    }

    return await this.userService.create(input)
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userService.findOne({ n_email: email })

    const isPasswordValid: boolean = this.isPasswordValid(password, user.n_password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.userService.update({
      id: user.i_id,
      d_lastLoginAt: new Date()
    })

    return this.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.userService.update({
      id: user.i_id,
      d_lastLoginAt: new Date()
    })


    return this.generateToken(user);
  }

  public async verifyToken(token: string): Promise<boolean> {
    const decodeToken = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    })

    const user = await this.userService.findAll(null, { n_email: decodeToken.email })

    if (!user) {
      throw new UnauthorizedException
    }

    return true
  }

  // Decoding the JWT Token
  private async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne(decoded.id);
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