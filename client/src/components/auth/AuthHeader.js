import React from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Typography } from '@material-ui/core';

import CustomButton from '../buttons/CustomButton';
import { useAuthStyle } from '../../hooks/styles';

const AuthHeader = ({ actionLabel, actionPath }) => {
    const history = useHistory();
    const classes = useAuthStyle();

    return (
        <Grid container className={classes.header} justify="flex-end">
            <Typography className={classes.typo}>Need to log in?</Typography>
            <CustomButton onClick={() => history.push(actionPath)}>{ actionLabel }</CustomButton>
        </Grid>
    );
};

export default AuthHeader;