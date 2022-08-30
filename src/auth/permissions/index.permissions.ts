import AdminPermissions from "./admin.permissions";
import SuperAdminPermissions from "./super-admin.permissions";
import UserPermissions from "./user.permissions";

const Permissions = {
    ...AdminPermissions,
    ...UserPermissions,
    ...SuperAdminPermissions
}

type Permissions =
    | AdminPermissions
    | UserPermissions
    | SuperAdminPermissions

export default Permissions