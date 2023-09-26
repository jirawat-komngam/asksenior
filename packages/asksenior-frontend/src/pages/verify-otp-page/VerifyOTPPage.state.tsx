import { create } from 'zustand'
// import { callLogin } from './graphql-adapters/login-adapter'
import { CommonError } from '../../helpers/error-helper'
import { callVerifyOTP } from './graphql-adapters/verify-otp-adapter'
import { NavigateFunction } from 'react-router-dom'

interface VerifyOTPPageState {
    otp: string
    errorMessage: string | undefined
    verifyOTP: (args: {
        otp: string
        email: string
        navigate: NavigateFunction
    }) => void
    setOTP: (args: { value: string }) => void
}

export const useVerifyOTPPageState = create<VerifyOTPPageState>()((set) => ({
    otp: '',
    errorMessage: undefined,
    async verifyOTP(args) {
        set(() => ({
            errorMessage: undefined,
        }))
        try {
            const token = await callVerifyOTP({
                userEmail: args.email,
                otp: args.otp,
            })
            localStorage.setItem('token', token.data.verifiedOTP)
            args.navigate('/')
        } catch (e) {
            set(() => ({
                errorMessage: (e as CommonError).message,
            }))
            console.log(e)
        }
    },
    setOTP(args) {
        set(() => ({
            otp: args.value,
        }))
    },
}))
