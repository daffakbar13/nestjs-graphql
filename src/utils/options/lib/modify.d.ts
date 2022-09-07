import { User } from "src/auth/entities/user.entity";

declare interface ModifyOptions {
    readonly access: 'create' | 'update'
    readonly user: User
}

export const Modify = (options: ModifyOptions): object => {
    const result = {}
    const { access, user } = options
    if (access === "create" || access === "update") {
        Object.assign(result, { i_updatedByUserId: user.i_id })
        if (access === "create") {
            Object.assign(result, { i_createdByUserId: user.i_id })
        }
    }

    return result
}