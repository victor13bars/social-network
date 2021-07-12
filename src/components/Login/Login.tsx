import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import styles from "./../common/FormsControls/FormsControls.module.css"

type CaptchaUrlType = {
    captchaUrl: string | null
}
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type FormDataValuesTypeKeys = Extract<keyof FormDataType, string>

export const LoginForm: React.FC<InjectedFormProps<FormDataType, CaptchaUrlType> & CaptchaUrlType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<FormDataValuesTypeKeys>("Email", 'email', Input, [required])}
            {createField<FormDataValuesTypeKeys>("Password", 'password', Input, [required], {type: "password"})}
            {createField<FormDataValuesTypeKeys>(undefined, 'rememberMe', Input, [], {type: "checkbox"}, "remember me")}
            {/*<Field placeholder={'Email'} name={'email'} component={Input} validate={[required]}/>*/}
            {/*<div>*/}
            {/*    <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]}*/}
            {/*           type={"password"}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me*/}
            {/*</div>*/}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<FormDataValuesTypeKeys>("Symbols from image", 'captcha', Input, [])}

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, CaptchaUrlType>({form: 'login'})(LoginForm)

export const Login: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onsubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onsubmit} captchaUrl={captchaUrl}/>
    </div>
}
