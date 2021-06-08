import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
});

const Alert = ({ message, type="error", visibility=false }) => {
    const classes = useStyles();

    if (!visibility) return <></>;

    return (
        <div className={classes.root}>
            <MUIAlert severity={type}>{message}</MUIAlert>
        </div>
    );
};

export default Alert;