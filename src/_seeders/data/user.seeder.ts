import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";
import { User } from "src/auth/entities/user.entity";
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from "src/auth/dto/user.dto";

@Seeder({ model: User, containsForeignKeys: true, foreignDelay: 2000 })
export class SeedUser implements OnSeederInit {
    private encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    run() {
        const data: CreateUserInput[] = [
            {
                i_rolesId: 3,
                n_name: 'superadmin',
                n_email: 'superadmin@gmail.com',
                n_password: this.encodePassword('success100%'),
                c_active: true,
            },
            {
                i_rolesId: 1,
                n_name: 'customer',
                n_email: 'customer@gmail.com',
                n_password: this.encodePassword('success100%'),
                c_active: true,
            },
            {
                i_rolesId: 2,
                n_name: 'admin',
                n_email: 'admin@gmail.com',
                n_password: this.encodePassword('success100%'),
                c_active: true,
            }
        ];
        return data
    }
}
