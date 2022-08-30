import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { resolve } from 'path';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from './auth.service';

config({ path: resolve(__dirname, '../../.env') })

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthService)
    private readonly helper: AuthService;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES },
            ignoreExpiration: true,

        });
    }

    protected validate(payload: string): Promise<User | never> {
        return this.helper.validateUser(payload);
    }
}