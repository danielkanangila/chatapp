import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffffff",
        color: theme.palette.primary.main,
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: "#ffffff"
        },
        ...(props => props?.styles)()
    },
}))

const CustomButton = ({ styles = {}, children, ...restProps }) => {
    const classes = useStyle({ styles })

    return (
        <Button variant="contained" color="primary" className={classes.root} {...restProps}>
            {children}
        </Button>
    );
};

export default CustomButton;