import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import { Resolvers } from './__generated__/resolvers-types'
import axios from 'axios'
import loadDotEnvConfig from './configs/dotenv-config.js'
import loadLoggerConfig from './configs/logger-config.js'
import { extractTokenFromHeader } from './helpers/context-helper.js'
import { GraphQLError } from 'graphql'
import { handleError } from './helpers/error-helper.js'
import { authenticateByUsingToken } from './helpers/authentication-helper.js'
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

const resolvers: Resolvers = {
    Query: {
        async universities() {
            const apiAxiosResult = await axios.get(
                `${process.env.UNIVERSITY_SERVICE_HOST}/api/v1/universities`
            )
            return apiAxiosResult.data.data
        },

        async postByID(_, args) {
            const apiAxiosResult = await axios.get(
                `${process.env.POST_SERVICE_HOST}/api/v1/posts/${args.postID}`
            )
            return apiAxiosResult.data.data
        },

        async postByFieldID(_, args) {
            const apiAxiosResult = await axios.get(
                `${process.env.POST_SERVICE_HOST}/api/v1/posts/field/${args.fieldID}`
            )
            return apiAxiosResult.data.data
        },

        async postByUserID(_, __, gatewayContext) {
            try {
                const tokenData = authenticateByUsingToken(gatewayContext.token)
                const apiAxiosResult = await axios.get(
                    `${process.env.POST_SERVICE_HOST}/api/v1/posts/user/${tokenData.payload.userID}`
                )
                return apiAxiosResult.data.data
            } catch (error) {
                handleError(error)
            }
        },
    },
    Mutation: {
        login: async (_, args, __) => {
            try {
                await axios.get(
                    `${process.env.USER_SERVICE_HOST}/api/v1/users/email/${args.userEmail}`
                )
                return 'done'
            } catch (error) {
                throw new GraphQLError(error.response.data.error, {
                    extensions: {
                        code: error.response.status,
                    },
                })
            }
        },

        updateUserInformation: async (_, args, gatewayContext) => {
            try {
                const tokenData = authenticateByUsingToken(gatewayContext.token)
                await axios.put(
                    `${process.env.USER_SERVICE_HOST}/api/v1/users/${tokenData.payload.userID}`,
                    {
                        userName: args.userName,
                        userYear: args.userYear,
                        fieldID: args.fieldID,
                    }
                )
                return 'done'
            } catch (error) {
                handleError(error)
            }
        },

        verifiedOTP: async (_, args, __) => {
            try {
                const apiAxiosResult = await axios.post(
                    `${process.env.USER_SERVICE_HOST}/api/v1/users/`,
                    {
                        otp: args.otp,
                        userEmail: args.userEmail,
                    }
                )
                const jwtToken = apiAxiosResult.data.data
                return jwtToken
            } catch (error) {
                handleError(error)
            }
        },

        createPost: async (_, args, gatewayContext) => {
            try {
                const tokenData = authenticateByUsingToken(gatewayContext.token)
                await axios.post(
                    `${process.env.POST_SERVICE_HOST}/api/v1/posts/`,
                    {
                        fieldID: args.fieldID,
                        postDescription: args.postDescription,
                        postTitle: args.postTitle,
                        userID: tokenData.payload.userID,
                        userName: args.userName,
                    }
                )
                return 'done'
            } catch (error) {
                throw new GraphQLError(error.response.data.error, {
                    extensions: {
                        code: error.response.status,
                    },
                })
            }
        },

        createComment: async (_, args, gatewayContext) => {
            try {
                const tokenData = authenticateByUsingToken(gatewayContext.token)
                await axios.post(
                    `${process.env.POST_SERVICE_HOST}/api/v1/posts/${args.postID}/comment`,
                    {
                        userYear: args.userYear,
                        userID: tokenData.payload.userID,
                        fieldID: args.fieldID,
                        commentContent: args.commentContent,
                    }
                )
                return 'done'
            } catch (error) {
                throw new GraphQLError(error.response.data.error, {
                    extensions: {
                        code: error.response.status,
                    },
                })
            }
        },
    },
}

export interface GatewayContext {
    token?: string
}

const server = new ApolloServer<GatewayContext>({
    typeDefs,
    resolvers,
})

loadDotEnvConfig()

const logger = loadLoggerConfig()
const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT) },
    context: extractTokenFromHeader,
})

logger.info(`🚀  GraphQL Gateway ready at: ${url}`)
