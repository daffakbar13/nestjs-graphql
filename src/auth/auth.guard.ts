import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ) { }
    public handleRequest(err: unknown, user: User): any {
        return user;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const token = ctx.getContext().req.headers.authorization;

        return this.authService.verifyToken(token as unknown as string)
    }
}