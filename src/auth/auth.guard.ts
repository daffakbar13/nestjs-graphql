import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, Type, mixin, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import Permissions from 'src/auth/permissions/index.permissions';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        public readonly authService: AuthService
    ) { }
    public handleRequest(err: unknown, user: User): any {
        return user;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const token = ctx.getContext().req.headers.authorization;
        const user = await this.authService.getUserByToken(token as unknown as string)

        if (!user) { return false }

        return user.c_active
    }
}

export const PermissionGuard = (permission: Permissions): Type<CanActivate> => {
    class PermissionGuardMixin extends JwtAuthGuard {
        constructor(
            public readonly authService: AuthService
        ) {
            super(authService);
        }
        async canActivate(context: ExecutionContext) {
            const ctx = GqlExecutionContext.create(context);
            const token = ctx.getContext().req.headers.authorization;
            const user = await this.authService.getUserByToken(token as unknown as string)
            const role = await this.authService.getRoleByUser({ i_id: user.i_roles_id })

            console.log(role?.permissions, 1);

            console.log(permission, 2);

            console.log(role?.permissions.includes(permission));


            return role?.permissions.includes(permission);
        }
    }
    return mixin(PermissionGuardMixin);
}