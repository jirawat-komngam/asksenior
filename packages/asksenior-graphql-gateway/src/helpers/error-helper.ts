import { GraphQLError } from 'graphql'

export const handleError = (error) => {
    throw new GraphQLError(error.response.data.error, {
        extensions: {
            code: error.response.status,
        },
    })
}
