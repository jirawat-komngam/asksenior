import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import { Resolvers } from './__generated__/resolvers-types'
import axios from 'axios'
import loadDotEnvConfig from './configs/dotenv-config.js'
import loadLoggerConfig from './configs/logger-config.js'
import { extractTokenFromHeader } from './helpers/context-helper.js'
import { GraphQLError } from 'graphql'
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

const resolvers: Resolvers = {
    Query: {
        async universities(_, __, gatewayContext) {
            const apiAxiosResult = await axios.get(
                `${process.env.UNIVERSITY_SERVICE_HOST}/api/v1/universities`
            )
            return apiAxiosResult.data.data
        },

        async postByID(_, args, gatewayContext) {
            const apiAxiosResult = await axios.get(
                `${process.env.POST_SERVICE_HOST}/api/v1/posts/` + args.postID
            )
            return apiAxiosResult.data.data
        },
        async postByFieldID(_, args, gatewayContext) {
            const apiAxiosResult = await axios.get(
                `${process.env.POST_SERVICE_HOST}/api/v1/posts/field/` +
                    args.fieldID
            )
            return apiAxiosResult.data.data
        },
        async postByUserID(_, args, gatewayContext) {
            const apiAxiosResult = await axios.get(
                `${process.env.POST_SERVICE_HOST}/api/v1/posts/user/` +
                    args.userID
            )
            return apiAxiosResult.data.data
        },
    },
    Mutation: {
        login: async (root, args, context) => {
            try {
                const apiAxiosResult = await axios.get(
                    `${process.env.USER_SERVICE_HOST}/api/v1/users/email/` +
                        args.userEmail
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
        verifiedOTP: async (root, args, context) => {
            try {
                const apiAxiosResult = await axios.post(
                    `${process.env.USER_SERVICE_HOST}/api/v1/users/`,
                    {
                        OTP: args.otp,
                        userEmail: args.userEmail,
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
        createPost: async (root, args, context) => {
            try {
                const apiAxiosResult = await axios.post(
                    `${process.env.POST_SERVICE_HOST}/api/v1/posts/`,
                    {
                        fieldID: args.fieldID,
                        postDescription: args.postDescription,
                        postTitle: args.postTitle,
                        userID: args.userID,
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
