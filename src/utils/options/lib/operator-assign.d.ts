import { fn, literal, Op } from "sequelize"
import { Operator } from "./operator"

declare function AssignOperator(operator: Operator): object {
    const result: object = {}

    if (operator?.adjacent) {
        Object.assign(result, { [operator.adjacent.column]: { [Op.adjacent]: operator.adjacent.value } })
    }
    if (operator?.all) {
        Object.assign(result, { [operator.all.column]: { [Op.all]: literal(operator.all.value) } })
    }
    // if (operator?.and) {
    //     Object.assign(result, {[operator.and.column]:{[Op.and]:operator.and.value}})
    // }
    if (operator?.any) {
        Object.assign(result, { [operator.any.column]: { [Op.any]: operator.any.value } })
    }
    if (operator?.between) {
        Object.assign(result, { [operator.between.column]: { [Op.between]: operator.between.value } })
    }
    if (operator?.col) {
        Object.assign(result, { [operator.col.column]: { [Op.col]: operator.col.value } })
    }
    if (operator?.contained) {
        Object.assign(result, { [operator.contained.column]: { [Op.contained]: operator.contained.value } })
    }
    if (operator?.contains) {
        Object.assign(result, { [operator.contains.column]: { [Op.contains]: operator.contains.value } })
    }
    if (operator?.endsWith) {
        Object.assign(result, { [operator.endsWith.column]: { [Op.endsWith]: operator.endsWith.value } })
    }
    if (operator?.eq) {
        Object.assign(result, { [operator.eq.column]: { [Op.eq]: operator.eq.value } })
    }
    if (operator?.gt) {
        Object.assign(result, { [operator.gt.column]: { [Op.gt]: operator.gt.value } })
    }
    if (operator?.gte) {
        Object.assign(result, { [operator.gte.column]: { [Op.gte]: operator.gte.value } })
    }
    if (operator?.iLike) {
        Object.assign(result, { [operator.iLike.column]: { [Op.iLike]: operator.iLike.value } })
    }
    if (operator?.iRegexp) {
        Object.assign(result, { [operator.iRegexp.column]: { [Op.iRegexp]: operator.iRegexp.value } })
    }
    if (operator?.in) {
        Object.assign(result, { [operator.in.column]: { [Op.in]: operator.in.value } })
    }
    if (operator?.is) {
        Object.assign(result, { [operator.is.column]: { [Op.is]: operator.is.value } })
    }
    if (operator?.like) {
        Object.assign(result, { [operator.like.column]: { [Op.like]: operator.like.value } })
    }
    if (operator?.lt) {
        Object.assign(result, { [operator.lt.column]: { [Op.lt]: operator.lt.value } })
    }
    if (operator?.lte) {
        Object.assign(result, { [operator.lte.column]: { [Op.lte]: operator.lte.value } })
    }
    if (operator?.match) {
        Object.assign(result, { [operator.match.column]: { [Op.match]: fn(operator.match.function, operator.match.value) } })
    }
    if (operator?.ne) {
        Object.assign(result, { [operator.ne.column]: { [Op.ne]: operator.ne.value } })
    }
    if (operator?.noExtendLeft) {
        Object.assign(result, { [operator.noExtendLeft.column]: { [Op.noExtendLeft]: operator.noExtendLeft.value } })
    }
    if (operator?.noExtendRight) {
        Object.assign(result, { [operator.noExtendRight.column]: { [Op.noExtendRight]: operator.noExtendRight.value } })
    }
    if (operator?.not) {
        Object.assign(result, { [operator.not.column]: { [Op.not]: operator.not.value } })
    }
    if (operator?.notBetween) {
        Object.assign(result, { [operator.notBetween.column]: { [Op.notBetween]: operator.notBetween.value } })
    }
    if (operator?.notILike) {
        Object.assign(result, { [operator.notILike.column]: { [Op.notILike]: operator.notILike.value } })
    }
    if (operator?.notIRegexp) {
        Object.assign(result, { [operator.notIRegexp.column]: { [Op.notIRegexp]: operator.notIRegexp.value } })
    }
    if (operator?.notIn) {
        Object.assign(result, { [operator.notIn.column]: { [Op.notIn]: operator.notIn.value } })
    }
    if (operator?.notLike) {
        Object.assign(result, { [operator.notLike.column]: { [Op.notLike]: operator.notLike.value } })
    }
    if (operator?.notRegexp) {
        Object.assign(result, { [operator.notRegexp.column]: { [Op.notRegexp]: operator.notRegexp.value } })
    }
    // if (operator?.or) {
    //     Object.assign(result, {[operator.or.column]:{[Op.or]:operator.or.value}})
    // }
    if (operator?.overlap) {
        Object.assign(result, { [operator.overlap.column]: { [Op.overlap]: operator.overlap.value } })
    }
    if (operator?.placeholder) {
        Object.assign(result, { [operator.placeholder.column]: { [Op.placeholder]: operator.placeholder.value } })
    }
    if (operator?.regexp) {
        Object.assign(result, { [operator.regexp.column]: { [Op.regexp]: operator.regexp.value } })
    }
    if (operator?.startsWith) {
        Object.assign(result, { [operator.startsWith.column]: { [Op.startsWith]: operator.startsWith.value } })
    }
    if (operator?.strictLeft) {
        Object.assign(result, { [operator.strictLeft.column]: { [Op.strictLeft]: operator.strictLeft.value } })
    }
    if (operator?.strictRight) {
        Object.assign(result, { [operator.strictRight.column]: { [Op.strictRight]: operator.strictRight.value } })
    }
    if (operator?.substring) {
        Object.assign(result, { [operator.substring.column]: { [Op.substring]: operator.substring.value } })
    }
    if (operator?.values) {
        Object.assign(result, { [operator.values.column]: { [Op.values]: operator.values.value } })
    }

    return { ...result }
}