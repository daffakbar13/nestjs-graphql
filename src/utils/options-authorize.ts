export const OptionsAuthorize = (options) => {
    switch (options) {
        case null:
        case undefined:
            return options = {}
        default:
            return options
    }
}