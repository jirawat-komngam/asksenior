interface SendMessageArguments {
    level: string
    prefix: string | undefined
    message: string
}
const mapMessageToLogStructure = ({
    prefix,
    message,
    level,
}: SendMessageArguments): string => {
    return `${prefix === undefined ? '' : `[${prefix}]`}[${level}] ${message}`
}

export const setupInfoMessage = (message: string): string => {
    return mapMessageToLogStructure({
        level: 'INFO',
        prefix: 'SETUP',
        message,
    })
}

export const setupErrorMessage = (message: string): string => {
    return mapMessageToLogStructure({
        level: 'ERROR',
        prefix: 'SETUP',
        message,
    })
}
