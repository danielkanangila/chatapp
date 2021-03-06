import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./.././Sidebar";
import { ActiveChat } from "./.././ActiveChat";
import { fetchConversations } from "./.././../store/utils/thunkCreators";
import { useAuth } from "../../hooks/useAuth";

const styles = {
  root: {
    height: "97vh",
  },
};

const Home = (props) => {
  const { logout } = useAuth();
  const { classes } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConversations())
  }, [dispatch])

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

