import React from 'react';
import { Grid } from '@material-ui/core';

import { useAuthStyle } from './../../hooks/styles';
import BGImage from "./../../assets/images/bg-img.png"
import { ReactComponent as BubbleIcon } from "./../../assets/images/bubble.svg"

const AuthSidebox = () => {
    const classes = useAuthStyle()
    return (
        <Grid item className={classes.sidebox}>
        <img src={BGImage} alt="chatapp illustration" className={classes.image} />
        <div className={classes.sideboxTextContainer}>
          <BubbleIcon />
          <h1 className={classes.sideboxText}>Converse with anyone <br/ > with any language</h1>
        </div>
      </Grid>
    );
};

export default AuthSidebox;