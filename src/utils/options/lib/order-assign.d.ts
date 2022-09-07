import { Order } from "./order"

export const AssignOrder = (options: Order): any[] => {
    const result = []

    if (options?.ascending) {
        options.ascending.forEach(column => { result.push([column, 'ASC']) })
    }
    if (options?.descending) {
        options.descending.forEach(column => { result.push([column, 'DESC']) })
    }

    return result
}
