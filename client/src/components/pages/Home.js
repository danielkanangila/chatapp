import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Grid, CssBaseline } from "@material-ui/core";
import { SidebarContainer } from "./.././Sidebar";
import { ActiveChat } from "./.././ActiveChat";
import { fetchConversations } from "./.././../store/utils/thunkCreators";
import { useAuth } from "../../hooks/useAuth";
import { setActiveChat } from "../../store/activeConversation";
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
  
}))

const Home = (props) => {
  const { user } = useAuth();
  const { conversations } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const ws = useWebSocket();
  const { isWindowVisible } = useWindowVisibility();

  useEffect(() => {
    dispatch(fetchConversations())
  }, [user]) // eslint-disable-line

  useEffect(() => {
    /**
     * emit go-online event if  window is visible
     * otherwise emit socket logout event 
     */
    if (isWindowVisible) ws.goOnline(user);
    else  ws.logout(user.id);
    return () => [];
  }, [isWindowVisible]) // eslint-disable-line

  useEffect(() => {
    console.log(conversations[0]);
    if (conversations.length)
      dispatch(setActiveChat(conversations[0].otherUser.username))
  }, [dispatch, conversations])

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <SidebarContainer />
      <ActiveChat />
    </Grid>
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
)(Home);

