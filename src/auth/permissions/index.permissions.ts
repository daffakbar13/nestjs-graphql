import AdminPermissions from "./admin.permissions";
import SuperAdminPermissions from "./super-admin.permissions";
import CustomerPermissions from "./customer.permissions";

const Permissions = {
    ...AdminPermissions,
    ...CustomerPermissions,
    ...SuperAdminPermissions
}

type Permissions =
    | AdminPermissions
    | CustomerPermissions
    | SuperAdminPermissions

export default Permissions