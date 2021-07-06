import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptcha} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
    isFetching: boolean
    isAuth: boolean
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    getAuth() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`,)
            .then(res => res.data)
    }
}