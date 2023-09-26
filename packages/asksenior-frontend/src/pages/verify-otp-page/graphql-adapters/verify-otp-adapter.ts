import { gql } from '@apollo/client'
import { apolloClient } from '../../../main'
import { handleGraphQLError } from '../../../helpers/error-helper'

const GQL = gql`
    mutation VerifiedOTP($otp: String!, $userEmail: String!) {
        verifiedOTP(otp: $otp, userEmail: $userEmail)
    }
`
export interface VerifyOTPAPIRequest {
    userEmail: string
    otp: string
}
export interface VerifyOTPAPIResponse {
    data: {
        verifiedOTP: string
    }
}
export const callVerifyOTP = (
    request: VerifyOTPAPIRequest
): Promise<VerifyOTPAPIResponse> => {
    return new Promise((resolve, reject) => {
        const handler = async () => {
            const result = await apolloClient
                .mutate({
                    mutation: GQL,
                    variables: request,
                })
                .catch(handleGraphQLError(reject))
            resolve(result as VerifyOTPAPIResponse)
        }
        handler()
    })
}
