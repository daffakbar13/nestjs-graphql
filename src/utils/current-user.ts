import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
    (__data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const sessionToken =
            context.getType() === 'http'
                ? context.switchToHttp().getRequest().headers.authorization
                : ctx.getContext().req.headers.authorization;

        return sessionToken;
    },
);
