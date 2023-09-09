export const extractTokenFromHeader = async ({ req }) => {
    return {
        token: req.headers?.token,
    }
}
