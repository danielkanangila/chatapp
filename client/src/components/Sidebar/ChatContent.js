import React, { useMemo } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../hooks/useAuth";
import { useTypingEvent } from "../../hooks/useTypingEvent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadCount: {
    height: 20,
    width: 20,
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { isTyping } = useTypingEvent(props.conversation.otherUser.id);

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const unreadCount = useMemo(() => {
   return conversation.messages.filter(
      m => m.status !== 'read' && m.senderId !== user.id
    ).length;
  }, [conversation, user])

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {isTyping ? 'Typing...' : latestMessageText}
        </Typography>
      </Box>
      {(unreadCount > 0) &&
        <Box component="span" className={classes.unreadCount}>{unreadCount}</Box>
      }
    </Box>
  );
};

export default ChatContent;