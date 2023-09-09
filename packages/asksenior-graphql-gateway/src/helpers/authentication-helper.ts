import { GraphQLError } from 'graphql'

export const authenticateByUsingToken = async (token: string) => {
    // throw new GraphQLError('User is not authenticated', {
    //     extensions: {
    //         code: 'UNAUTHENTICATED',
    //         http: { status: 401 },
    //     },
    // })
    const tokenData = {
        userID: '1',
        userEmail: 'abc@bcd',
    }
    return tokenData
}
