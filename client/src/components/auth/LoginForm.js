import React from 'react';

import Form from '../form/Form';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStyle } from '../../hooks/styles';
import FormTextField from '../form/FormTextField';

const LoginForm = () => {
    const { login, loginInitialValue, loginValidationSchema, error } = useAuth();
    const classes = useAuthStyle();

    return (
        <Form 
            initialValues={loginInitialValue} 
            onSubmit={login} 
            error={error} 
            className={classes.loginForm} 
            fieldsetClassName={classes.fieldset}
            submitLabel="Login" 
            validationSchema={loginValidationSchema}
        >
            <FormTextField label="Username" name="username" required />
            <FormTextField label="Password" name="password" type="password" required />
        </Form>
    );
};

export default LoginForm;