import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./.././Sidebar";
import { ActiveChat } from "./.././ActiveChat";
import { fetchConversations } from "./.././../store/utils/thunkCreators";
import { useAuth } from "../../hooks/useAuth";
import { useWebSocket } from "../../hooks/useWebSocket";

const styles = {
  root: {
    height: "97vh",
  },
};

const Home = (props) => {
  const { user, logout } = useAuth();
  const { classes } = props;
  const dispatch = useDispatch();
  const ws = useWebSocket();

  useEffect(() => {
    dispatch(fetchConversations())
  }, [user]) // eslint-disable-line

  useEffect(() => {
    // signal that user is offline on window blur event
    window.addEventListener("blur", () => ws.logout(user.id))

    // signal that user is back online window has focus
    window.addEventListener("focus", () => ws.goOnline(user));

    return () => [];
  }, []) // eslint-disable-line

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

