import { gql } from '@apollo/client'
import { apolloClient } from '../../../main'
import { handleGraphQLError } from '../../../helpers/error-helper'

const GQL = gql`
    mutation CreatePost(
        $fieldID: String!
        $postDescription: String!
        $postTitle: String!
        $userName: String!
    ) {
        createPost(
            fieldID: $fieldID
            postDescription: $postDescription
            postTitle: $postTitle
            userName: $userName
        )
    }
`
export interface CreatePostAPIRequest {
    token: string
    fieldID: string
    postDescription: string
    postTitle: string
    userName: string
}
export const callCreatePost = (
    request: CreatePostAPIRequest
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
