export interface CommonError {
    message: string
}

export interface CustomError {
    code: string
    message: string
    details: string
}

export const toCustomError = (
    code: string,
    message: string,
    error: unknown
): CustomError => {
    return {
        code,
        message,
        details: JSON.stringify(error),
    } as CustomError
}

export const handleGraphQLError = (
    reject: (reason?: unknown) => void
): ((e: {
    networkError?: {
        result: {
            errors: {
                message: string
            }[]
        }
    }
    message: string
}) => void) => {
    return (e) => {
        if (e.networkError == undefined) {
            reject({
                code: 'ApplicationError',
                message: e.message,
                details: JSON.stringify(e),
            })
            return
        }

        const errorDetails = JSON.stringify(
            e.networkError.result.errors.map(
                (eachError: { message: string }) => ({
                    message: eachError.message,
                })
            )
        )
        reject({
            code: 'GraphQLError',
            message: e.message,
            details: errorDetails,
        })
    }
}
