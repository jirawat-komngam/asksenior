import { create } from 'zustand'
import {
    FacultyModel,
    GetLatestSubscriptionAPIResponse,
    UniversityModel,
    callGetAllUniversity,
} from './graphql-adapters/get-all-university-adapter'
import {
    GetPostsByFieldIDAPIResponse,
    callGetPostsByFieldID,
} from './graphql-adapters/get-posts-by-field-id-adapter'
import { callCreatePost } from './graphql-adapters/create-post-adapter'

interface FeedPageState {
    postDescription: string
    universities: GetLatestSubscriptionAPIResponse | undefined
    posts: GetPostsByFieldIDAPIResponse | undefined
    selectedUniversity: UniversityModel | undefined
    selectedFaculty: FacultyModel | undefined
    selectedFieldID: string | undefined
    selectedFieldIDForCreatingPost: string | undefined
    initializePage: (args: { universityName: string | undefined }) => void
    setPostDescription: (args: { value: string }) => void
    setSelectedFieldIDForCreatingPost: (args: { value: string }) => void
    setFaculty: (args: { faculty: FacultyModel }) => void
    setFieldID: (args: { value: string }) => void
    post: (args: { token: string }) => void
}

export const useFeedPageState = create<FeedPageState>()((set, get) => ({
    postDescription: '',
    universities: undefined,
    posts: undefined,
    selectedUniversity: undefined,
    selectedFaculty: undefined,
    selectedFieldID: undefined,
    selectedFieldIDForCreatingPost: undefined,
    initializePage: async (args) => {
        const universities = await callGetAllUniversity()
        for (const eachUniversity of universities.data.universities) {
            if (eachUniversity.universityShortName === args.universityName) {
                set(() => ({
                    selectedUniversity: eachUniversity,
                    selectedFaculty: eachUniversity.faculties[0],
                    selectedFieldID:
                        eachUniversity.faculties[0].fields[0].fieldID,
                }))
                const posts = await callGetPostsByFieldID({
                    fieldID: eachUniversity.faculties[0].fields[0].fieldID,
                })
                set(() => ({
                    posts,
                }))
            }
        }

        set(() => ({
            universities,
        }))
    },
    async setFaculty(args) {
        set(() => ({
            selectedFaculty: args.faculty,
        }))
        const posts = await callGetPostsByFieldID({
            fieldID: args.faculty.fields[0].fieldID,
        })
        set(() => ({
            posts,
            selectedFieldID: args.faculty.fields[0].fieldID,
        }))
    },
    async setFieldID(args) {
        set(() => ({
            selectedFieldID: args.value,
        }))
        const posts = await callGetPostsByFieldID({
            fieldID: args.value,
        })
        set(() => ({
            posts,
        }))
    },
    setPostDescription(args) {
        set(() => ({
            postDescription: args.value,
        }))
    },
    setSelectedFieldIDForCreatingPost(args) {
        set(() => ({
            selectedFieldIDForCreatingPost: args.value,
        }))
    },
    async post(args) {
        if (get().selectedFieldIDForCreatingPost == undefined) {
            return
        }

        await callCreatePost({
            token: args.token,
            fieldID: get().selectedFieldIDForCreatingPost!,
            postDescription: get().postDescription,
            postTitle: get().postDescription,
            userName: '',
        })
        const posts = await callGetPostsByFieldID({
            fieldID: get().selectedFieldID as string,
        })
        set(() => ({
            posts,
        }))
    },
}))
