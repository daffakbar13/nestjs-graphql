import { BrandPermission } from "src/auth/permissions/enums/brand.enum";
import { ProductStatusPermission } from "src/auth/permissions/enums/product-status.enum";
import { ProductPermission } from "src/auth/permissions/enums/product.enum";

export enum AdminEnum {
}

const AdminPermissions = {
    ...AdminEnum,
    ...BrandPermission,
    ...ProductPermission,
    ...ProductStatusPermission,
}
type AdminPermissions =
    | AdminEnum
    | BrandPermission
    | ProductPermission
    | ProductStatusPermission

export default AdminPermissions
