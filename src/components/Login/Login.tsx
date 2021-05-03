import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import styles from "./../common/FormsControls/FormsControls.module.css"

type CaptchaUrlType = {
    captchaUrl: string
}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType, CaptchaUrlType> & CaptchaUrlType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", 'email', Input, [required])}
            {createField("Password", 'password', Input, [required], {type: "password"})}
            {createField(null, 'rememberMe', Input, [], {type: "checkbox"}, "remember me")}
            {/*<Field placeholder={'Email'} name={'email'} component={Input} validate={[required]}/>*/}
            {/*<div>*/}
            {/*    <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]}*/}
            {/*           type={"password"}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me*/}
            {/*</div>*/}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", 'captcha', Input, [])}

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

export const Login = (props: any) => {
    const onsubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onsubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);