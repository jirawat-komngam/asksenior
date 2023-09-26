import { create } from 'zustand'
import {
    PostModel,
    callGetPostByPostID,
} from './graphql-adapters/get-post-by-post-id-adapter'
import {
    GetLatestSubscriptionAPIResponse,
    UniversityModel,
    callGetAllUniversity,
} from '../feed-page/graphql-adapters/get-all-university-adapter'
import { callCreateComment } from './graphql-adapters/create-comment-adapter'

interface PostPageState {
    universities: GetLatestSubscriptionAPIResponse | undefined
    selectedUniversity: UniversityModel | undefined
    selectedPost: PostModel | undefined
    isNotFound: boolean
    commentDescription: string
    initializePage: (args: {
        universityName: string | undefined
        postID: string | undefined
    }) => void
    setCommentDescription: (args: { value: string }) => void
    createComment: (args: { token: string }) => void
}

export const usePostPageState = create<PostPageState>()((set, get) => ({
    universities: undefined,
    selectedUniversity: undefined,
    selectedPost: undefined,
    isNotFound: false,
    commentDescription: '',
    initializePage: async (args) => {
        if (args.postID == undefined) {
            return
        }

        const universities = await callGetAllUniversity()
        for (const eachUniversity of universities.data.universities) {
            if (eachUniversity.universityShortName === args.universityName) {
                set(() => ({
                    selectedUniversity: eachUniversity,
                    selectedFaculty: eachUniversity.faculties[0],
                    selectedFieldID:
                        eachUniversity.faculties[0].fields[0].fieldID,
                }))
            }
        }
        set(() => ({
            universities,
        }))

        const post = await callGetPostByPostID({
            postID: args.postID,
        })
        set(() => ({
            isNotFound: post == undefined,
            selectedPost: post.data.postByID,
        }))
    },
    setCommentDescription(args) {
        set(() => ({
            commentDescription: args.value,
        }))
    },
    async createComment(args) {
        if (get().selectedPost == undefined) {
            return
        }

        await callCreateComment({
            token: args.token,
            postID: get().selectedPost!.postID,
            userYear: 1,
            fieldID: get().selectedPost!.fieldID,
            commentContent: get().commentDescription,
        })

        const post = await callGetPostByPostID({
            postID: get().selectedPost!.postID,
        })
        set(() => ({
            isNotFound: post == undefined,
            selectedPost: post.data.postByID,
        }))
    },
}))
