import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";
import { User } from "src/auth/entities/user.entity";
import * as bcrypt from 'bcryptjs';

@Seeder({ model: User, containsForeignKeys: true, })
export class SeedUser implements OnSeederInit {
    private encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    run() {
        const data = [
            {
                i_roles_id: 1,
                n_name: 'user',
                n_email: 'user@gmail.com',
                n_password: this.encodePassword('success100%'),
                c_active: true,
            }
        ];
        return data
    }
}

@Seeder({ model: User, containsForeignKeys: true, })
export class SeedAdmin implements OnSeederInit {
    private encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    run() {
        const data = [
            {
                i_roles_id: 2,
                n_name: 'admin',
                n_email: 'admin@gmail.com',
                n_password: this.encodePassword('success100%'),
                c_active: true,
            }
        ];
        return data
    }
}

@Seeder({ model: User, containsForeignKeys: true, })
export class SeedSuperAdmin implements OnSeederInit {
    private encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    run() {
        const data = [
            {
                i_roles_id: 3,
                n_name: 'superadmin',
                n_email: 'superadmin@gmail.com',
                n_password: this.encodePassword('success100%'),
                c_active: true,
            }
        ];
        return data
    }
}
