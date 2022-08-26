import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }
    public handleRequest(err: unknown, user: User): any {
        return user;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const token = ctx.getContext().req.headers.authorization;

        const user = await this.authService.getUserByToken(token as unknown as string)

        if (!user || user.c_active === false) { throw new UnauthorizedException }

        return true
    }
}