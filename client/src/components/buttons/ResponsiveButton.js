import React from 'react';
import { Button, useTheme, useMediaQuery } from '@material-ui/core';

const ResponsiveButton = ({ children, ...restOfProps }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Button
            fullWidth={!matches}
            {...restOfProps}
        >
            {children}
        </Button>
    );
};

export default ResponsiveButton;