import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterUser {
    static readonly KEY = 'register'

    @Field()
    @Trim()
    @IsEmail()
    public readonly email: string;

    @Field()
    @IsString()
    @MinLength(8)
    public readonly password: string;

    @Field()
    @IsString()
    public readonly name: string;
}

@InputType()
export class LoginDto {
    static readonly KEY = 'login'

    @Field()
    @Trim()
    @IsEmail()
    public readonly email: string;

    @Field()
    @IsString()
    public readonly password: string;
}

@ObjectType()
export class Token {
    @Field()
    public readonly token: string
}