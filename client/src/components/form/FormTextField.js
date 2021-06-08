import React from 'react';
import { useFormikContext } from 'formik';
import { Grid, FormControl, TextField, FormHelperText } from '@material-ui/core';

const FormTextField = ({
    label,
    name,
    type="text",
    required=false,
}) => {
    const { errors, touched, values, status, setFieldTouched, setFieldValue } = useFormikContext();

    const hasError = () => (errors.hasOwnProperty(name) && touched.hasOwnProperty(name)) ||
        (touched.hasOwnProperty(name) && (status && status.hasOwnProperty(name)))

    return (
        <Grid>
            <FormControl error={hasError()} fullWidth>
                <TextField
                  aria-label={name}
                  label={label}
                  type={type}
                  name={name}
                  value={values[name]}
                  required={required}
                  onChange={e => setFieldValue(name, e.target.value)}
                  onBlur={() => setFieldTouched(name)}
                  style={{marginTop: 15}}
                />
                {hasError() && 
                    <FormHelperText>
                    {errors[name]}
                    </FormHelperText>
                }
            </FormControl>
        </Grid>
    );
};

export default FormTextField;