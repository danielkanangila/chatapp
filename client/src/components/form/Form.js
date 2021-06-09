import React from 'react';
import { Formik } from "formik";

import Alert from "./../Alert";
import ResponsiveButton from '../buttons/ResponsiveButton';

const Form = ({ 
    initialValues, 
    submitLabel, 
    onSubmit, 
    validationSchema = () => {}, 
    children, 
    error, 
    className,
    fieldsetClassName, 
    ...otherProps
}) => (
    <Formik enableReinitialize={true} validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({handleSubmit}) => (
            <form onSubmit={handleSubmit} className={className} {...otherProps}>
                <Alert visibility={!!error} message={error} />
                <fieldset className={fieldsetClassName}>
                    {children}
                </fieldset>
                <ResponsiveButton type="submit" variant="contained" size="large" color="primary">
                    {submitLabel}
                </ResponsiveButton>
            </form>
        )}
    </Formik>
)

export default Form;