import React from 'react';

import Form from '../form/Form';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStyle } from '../../hooks/styles';
import FormTextField from '../form/FormTextField';

const RegisterForm = () => {
    const { register, registerInitialValue, registerValidationSchema, error } = useAuth();
    const classes = useAuthStyle();

    return (
        <Form 
            initialValues={registerInitialValue} 
            onSubmit={register} 
            error={error} 
            className={classes.form} 
            fieldsetClassName={classes.fieldset}
            submitLabel="Create" 
            validationSchema={registerValidationSchema}
        >
            <FormTextField label="Username" name="username" required />
            <FormTextField label="Email" name="email" type="email" required />
            <FormTextField label="Password" name="password" type="password" required />
            <FormTextField label="Confirm Password" name="confirmPassword" type="password" required />
        </Form>
    );
};

export default RegisterForm;