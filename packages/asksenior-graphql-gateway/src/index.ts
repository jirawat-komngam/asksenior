import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import { Resolvers } from './__generated__/resolvers-types'
import axios from 'axios'
import loadDotEnvConfig from './configs/dotenv-config.js'
import loadLoggerConfig from './configs/logger-config.js'
import { extractTokenFromHeader } from './helpers/context-helper.js'

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

const resolvers: Resolvers = {
    Query: {
        async universities(_, __, gatewayContext) {
            const apiAxiosResult = await axios.get(
                `${process.env.UNIVERSITY_SERVICE_HOST}/api/v1/universities`
            )
            return apiAxiosResult.data.data
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
