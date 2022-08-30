import AdminPermissions from "./admin.permissions";

export enum SuperAdminEnum {
    RegisterAdmin = 'RegisterAdmin'
}

const SuperAdminPermissions = {
    ...SuperAdminEnum,
    ...AdminPermissions,
}
type SuperAdminPermissions =
    | SuperAdminEnum
    | AdminPermissions

export default SuperAdminPermissions
