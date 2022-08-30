import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";
import AdminPermissions from "src/auth/permissions/admin.permissions";
import SuperAdminPermissions from "src/auth/permissions/super-admin.permissions";
import UserPermissions from "src/auth/permissions/user.permissions";
import { Role } from "src/auth/entities/role.entity";

@Seeder({ model: Role })
export class SeedRoleUser implements OnSeederInit {
    run() {
        const user = UserPermissions
        const userPermission = []

        for (const key in user) {
            userPermission.push(key)
        }

        const data = [
            {
                n_role: 'User',
                permissions: userPermission
            }
        ];
        return data
    }
}

@Seeder({ model: Role })
export class SeedRoleAdmin implements OnSeederInit {
    run() {
        const admin = AdminPermissions
        const adminPermission = []

        for (const key in admin) {
            adminPermission.push(key)
        }

        const data = [
            {
                n_role: 'Admin',
                permissions: adminPermission
            },
        ];
        return data
    }
}

@Seeder({ model: Role })
export class SeedRoleSuperAdmin implements OnSeederInit {
    run() {
        const superAdmin = SuperAdminPermissions
        const superAdminPermission = []

        for (const key in superAdmin) {
            superAdminPermission.push(key)
        }

        const data = [
            {
                n_role: 'Super Admin',
                permissions: superAdminPermission
            }
        ];
        return data
    }
}
