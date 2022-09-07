import { AssignOperator } from "./operator-assign";
import { Options } from "./options";
import { AssignOrder } from "./order-assign";

export const Query = (filter: object, options?: Options): object => {
    return {
        where: { ...filter, ...AssignOperator(options?.operator) },
        limit: options?.limit,
        offset: options?.offset,
        order: [...AssignOrder(options?.orderBy)]
    }
}