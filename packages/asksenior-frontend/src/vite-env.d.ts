/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_GRAPHQL_GATEWAY_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
