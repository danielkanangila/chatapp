import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { connect, useDispatch } from "react-redux";
import { Grid, CssBaseline, CircularProgress, Typography } from "@material-ui/core";
import { SidebarContainer } from "./.././Sidebar";
import { ActiveChat } from "./.././ActiveChat";
import { fetchConversations } from "./.././../store/utils/thunkCreators";
import { useAuth } from "../../hooks/useAuth";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useWindowVisibility } from "../../hooks/useWindowVisibility";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  progress: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
  },
  progressLabel: {
    fontSize: "1.5rem",
    color: grey[400],
    padding: 20,
  }
}))

const Home = (props) => {
  const { user } = useAuth();
  const classes = useStyles();
  const dispatch = useDispatch();
  const ws = useWebSocket();
  const { isWindowVisible } = useWindowVisibility();

  useEffect(() => {
    dispatch(fetchConversations())
  }, [dispatch])

  useEffect(() => {
    /**
     * emit go-online event if  window is visible
     * otherwise emit socket logout event 
     */
    if (isWindowVisible) ws.goOnline(user);
    else  ws.logout(user.id);
    return () => [];
  }, [isWindowVisible]) // eslint-disable-line

  if (user.isFetching) return <Progress />

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <SidebarContainer />
      <ActiveChat />
    </Grid>
  );
}

const Progress = ({ visibility=true }) => {
  const classes = useStyles();

  if (!visibility) return <></>;

  return (
  <Grid container className={classes.progress} direction="column" justify="center" alignItems="center">
    <CircularProgress />
    <Typography variant="h1" className={classes.progressLabel}>Loading....</Typography>
  </Grid>)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

export default connect(
  mapStateToProps,
)(Home);

