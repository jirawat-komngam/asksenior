import jwt from 'jsonwebtoken'

export const authenticateByUsingToken = (
    token: string | undefined
): {
    sub: string
    payload: {
        userID: string
        userEmail: string
    }
    exp: number
    iat: number
} => {
    if (token == undefined) {
        throw {
            response: {
                data: {
                    error: 'token is undefined',
                },
                status: 400,
            },
        }
    }

    try {
        const tokenData = jwt.verify(token, atob(process.env.JWT_SECRET))
        return tokenData
    } catch (e) {
        throw {
            response: {
                data: {
                    error: 'invalid token',
                },
                status: 403,
            },
        }
    }
}
