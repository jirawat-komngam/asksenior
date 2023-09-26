import { create } from 'zustand'
import { callLogin } from './graphql-adapters/login-adapter'
import { CommonError } from '../../helpers/error-helper'
import { NavigateFunction } from 'react-router-dom'

interface SignInPageState {
    email: string
    errorMessage: string | undefined
    login: (args: { email: string; navigate: NavigateFunction }) => void
    setEmail: (args: { value: string }) => void
}

export const useSignInPageState = create<SignInPageState>()((set, get) => ({
    email: '',
    errorMessage: undefined,
    async login(args) {
        set(() => ({
            errorMessage: undefined,
        }))
        if (get().email.trim() == '') {
            set(() => ({
                errorMessage: 'email is required',
            }))
            return
        }
        try {
            await callLogin({
                userEmail: args.email,
            })
            localStorage.setItem('userEmail', args.email)
            args.navigate('/verify-otp')
        } catch (e) {
            set(() => ({
                errorMessage: (e as CommonError).message,
            }))
            console.log(e)
        }
    },
    setEmail(args) {
        set(() => ({
            email: args.value,
        }))
    },
}))
