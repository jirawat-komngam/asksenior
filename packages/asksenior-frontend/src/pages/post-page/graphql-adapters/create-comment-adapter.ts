import { gql } from '@apollo/client'
import { apolloClient } from '../../../main'
import { handleGraphQLError } from '../../../helpers/error-helper'

const GQL = gql`
    mutation CreateComment(
        $postID: String!
        $userYear: Int!
        $fieldID: String!
        $commentContent: String!
    ) {
        createComment(
            postID: $postID
            userYear: $userYear
            fieldID: $fieldID
            commentContent: $commentContent
        )
    }
`
export interface CreateCommentAPIRequest {
    token: string
    postID: string
    userYear: number
    fieldID: string
    commentContent: string
}
export const callCreateComment = (
    request: CreateCommentAPIRequest
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const handler = async () => {
            await apolloClient
                .mutate({
                    mutation: GQL,
                    variables: request,
                    context: {
                        headers: {
                            token: request.token,
                        },
                    },
                })
                .catch(handleGraphQLError(reject))
            resolve()
        }
        handler()
    })
}
