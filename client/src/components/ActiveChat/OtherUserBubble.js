import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import VisibilitySensor from "react-visibility-sensor";
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

const OtherUserBubble = ({ 
  id,
  text, 
  time, 
  otherUser, 
  status, 
  senderId,
  messagesRef,
}) => {
  const classes = useStyles();
  const chatRef = useRef();
  const dispatch = useDispatch();
  const { emitMessageUpdated } = useWebSocket();
  const [visibility, setVisibility] = useState(false);
  // const myWindow = useWindowVisibility();

  const updateMessageStatus = useCallback((newStatus) => {
    dispatch(updateMessage(id, { 
      recipientId: otherUser.id, 
      senderId,
      status: newStatus
    }, emitMessageUpdated));
  }, [dispatch, emitMessageUpdated, id, senderId, otherUser.id]);

  useEffect(() => {
    /**
     * Updating message status to READ if window is visible and this message 
     * component is in the viewport.
    */
    if (visibility && status !== messageStatus.READ) 
      updateMessageStatus(messageStatus.READ);
  }, [updateMessageStatus, visibility, status]);

  return (
    <VisibilitySensor onChange={(isVisible) => setVisibility(isVisible)}>
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
    </VisibilitySensor>
  );
};

export default React.memo(OtherUserBubble);
