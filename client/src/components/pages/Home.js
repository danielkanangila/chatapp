import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./.././Sidebar";
import { ActiveChat } from "./.././ActiveChat";
import { fetchConversations } from "./.././../store/utils/thunkCreators";
import { useAuth } from "../../hooks/useAuth";
<<<<<<< HEAD
import { useWebSocket } from "../../hooks/useWebSocket";
import { useWindowVisibility } from "../../hooks/useWindowVisibility";
=======
>>>>>>> 0e19ff3aac5630a64e80d2768d28617de2f17568

const styles = {
  root: {
    height: "97vh",
  },
};

const Home = (props) => {
  const { user, logout } = useAuth();
  const { classes } = props;
  const dispatch = useDispatch();
<<<<<<< HEAD
  const ws = useWebSocket();
  const { isWindowVisible } = useWindowVisibility();
=======
>>>>>>> 0e19ff3aac5630a64e80d2768d28617de2f17568

  useEffect(() => {
    dispatch(fetchConversations())
  }, [user]) // eslint-disable-line

<<<<<<< HEAD
  useEffect(() => {
    /**
     * emit go-online event if  window is visible
     * otherwise emit socket logout event 
     */
    if (isWindowVisible) ws.goOnline(user);
    else  ws.logout(user.id);
    return () => [];
  }, [isWindowVisible]) // eslint-disable-line

=======
>>>>>>> 0e19ff3aac5630a64e80d2768d28617de2f17568
  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={logout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

export default connect(
  mapStateToProps,
)(withStyles(styles)(Home));

