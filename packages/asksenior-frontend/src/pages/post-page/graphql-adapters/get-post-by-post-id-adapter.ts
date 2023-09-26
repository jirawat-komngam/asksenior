import { gql } from '@apollo/client'
import { apolloClient } from '../../../main'
import { handleGraphQLError } from '../../../helpers/error-helper'

const GQL = gql`
    query PostByID($postID: String!) {
        postByID(postID: $postID) {
            comments {
                commentContent
                userYear
            }
            postDescription
            postID
            postTitle
            userID
            fieldID
        }
    }
`
export interface GetPostByPostIDAPIRequest {
    postID: string
}
export interface GetPostByPostIDAPIResponse {
    data: {
        postByID: PostModel | undefined
    }
}
export interface PostModel {
    postID: string
    postTitle: string
    postDescription: number
    userID: string
    fieldID: string
    comments: CommentModel[]
}
export interface CommentModel {
    commentContent: string
    userYear: number
}
export const callGetPostByPostID = (
    request: GetPostByPostIDAPIRequest
): Promise<GetPostByPostIDAPIResponse> => {
    return new Promise((resolve, reject) => {
        const handler = async () => {
            const result = await apolloClient
                .query({
                    query: GQL,
                    variables: request,
                })
                .catch(handleGraphQLError(reject))
            resolve(result as GetPostByPostIDAPIResponse)
        }
        handler()
    })
}
