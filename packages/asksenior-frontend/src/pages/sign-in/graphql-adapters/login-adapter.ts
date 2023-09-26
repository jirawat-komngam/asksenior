import { gql } from '@apollo/client'
import { apolloClient } from '../../../main'
import { handleGraphQLError } from '../../../helpers/error-helper'

const GQL = gql`
    mutation Login($userEmail: String!) {
        login(userEmail: $userEmail)
    }
`
export interface LoginAPIRequest {
    userEmail: string
}
export const callLogin = (request: LoginAPIRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
        const handler = async () => {
            await apolloClient
                .mutate({
                    mutation: GQL,
                    variables: request,
                })
                .catch(handleGraphQLError(reject))
            resolve()
        }
        handler()
    })
}
