import { gql } from '@apollo/client'
import { apolloClient } from '../../../main'
import { handleGraphQLError } from '../../../helpers/error-helper'

const GQL = gql`
    query PostByFieldID($fieldID: String!) {
        postByFieldID(fieldID: $fieldID) {
            comments {
                commentContent
                commentID
                fieldID
                userID
                userYear
            }
            fieldID
            postDescription
            postID
            postTitle
            userID
            userName
        }
    }
`
export interface GetPostsByFieldIDAPIRequest {
    fieldID: string
}
export interface GetPostsByFieldIDAPIResponse {
    data: {
        postByFieldID: PostModel[]
    }
}
export interface PostModel {
    postID: string
    postTitle: string
    postDescription: number
    userID: string
    comments: CommentModel[]
}
export interface CommentModel {
    commentContent: string
    userYear: number
}
export const callGetPostsByFieldID = (
    request: GetPostsByFieldIDAPIRequest
): Promise<GetPostsByFieldIDAPIResponse> => {
    return new Promise((resolve, reject) => {
        const handler = async () => {
            const result = await apolloClient
                .query({
                    query: GQL,
                    variables: request,
                })
                .catch(handleGraphQLError(reject))
            resolve(result as GetPostsByFieldIDAPIResponse)
        }
        handler()
    })
}
