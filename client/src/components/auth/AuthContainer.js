import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';

import { useAuthStyle } from '../../hooks/styles';
import AuthSidebox from './AuthSidebox';
import AuthHeader from './AuthHeader';

const AuthContainer = ({ title, headerActionName, headerActionPath, children }) => {
    const classes = useAuthStyle()

    return (
        <Grid container className={classes.root}>
            <AuthSidebox />
            <Grid className={classes.mainContent} container direction="column">
                <AuthHeader actionLabel={headerActionName} actionPath={headerActionPath} />
                <Box className={classes.formContainer}>
                    <Typography variant="h1" className={classes.formTitle}>{title}</Typography>
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
};

export default AuthContainer;