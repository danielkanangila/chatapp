import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { isInViewport } from "./../../utils";
import { useWebSocket } from "../../hooks/useWebSocket";
import { updateMessage } from "../../store/utils/thunkCreators";

export const messageStatus = {
  SENT: 'sent',
  RECEIVED: 'received',
  READ: 'read',
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser } = props;
  const chatRef = useRef();
  const dispatch = useDispatch();
  const ws = useWebSocket();

  useEffect(() => {
    // don't update status if message status is already read
    if (props.status === messageStatus.READ)
      return;
    
    if(isInViewport(chatRef.current)) {
      dispatch(updateMessage(props.id, { 
        recipientId: props.otherUser.id, 
        senderId: props.senderId,
         status: messageStatus.READ 
        }, ws.emitMessageUpdated));
    }
  }, [props]) // eslint-disable-line

  return (
    <Box className={classes.root} ref={chatRef}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(OtherUserBubble);
