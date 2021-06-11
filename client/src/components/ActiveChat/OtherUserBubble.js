import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import VisibilitySensor from "react-visibility-sensor";
import { useWebSocket } from "../../hooks/useWebSocket";
import { updateMessage } from "../../store/utils/thunkCreators";

import { useWindowVisibility } from "../../hooks/useWindowVisibility";

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
  const ws = useWebSocket();
  const myWindow = useWindowVisibility();

  const updateMessageStatus = (newStatus) => {
    dispatch(updateMessage(id, { 
      recipientId: otherUser.id, 
      senderId,
      status: newStatus
    }, ws.emitMessageUpdated));
  }

  const handleVisibilityChange = (isVisible) => {
    if (status === messageStatus.READ) return;

    if(myWindow.isWindowVisible && isVisible) {
      /**
     * Updating message status to READ if window is visible and this message 
     * component is in the viewport.
     */
      
      updateMessageStatus(messageStatus.READ);
    } else {
      /**
       * If windows is not visible and this message component is not visible in
       * the viewport but the application is running, we're changing the message to RECEIVED
       */
       updateMessageStatus(messageStatus.RECEIVED);
    }
  }

  return (
    <VisibilitySensor onChange={handleVisibilityChange}>
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
