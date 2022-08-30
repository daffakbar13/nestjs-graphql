import { BrandPermission } from "src/auth/permissions/enums/brand.enum";
import { ProductStatusPermission } from "src/auth/permissions/enums/product-status.enum";
import { ProductPermission } from "src/auth/permissions/enums/product.enum";

export enum CustomerEnum {
}

const CustomerPermissions = {
    ...CustomerEnum,
    ReadBrand: BrandPermission.ReadBrand,
    ReadProduct: ProductPermission.ReadProduct,
    ReadProductStatus: ProductStatusPermission.ReadProductStatus
}
type CustomerPermissions =
    | CustomerEnum
    | BrandPermission.ReadBrand
    | ProductPermission.ReadProduct
    | ProductStatusPermission.ReadProductStatus

export default CustomerPermissions
