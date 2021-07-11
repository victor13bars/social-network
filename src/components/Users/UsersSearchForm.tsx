import {Field, Form, Formik} from "formik";
import React from "react";

const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type UserSearchFormObjectType = {
    term: string
}

const UserSearchForm = () => {

    const submit = (values: UserSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {}

    return <div>
        <Formik
            initialValues={{term: ''}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default UserSearchForm;