import React, { useCallback, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect, useDispatch } from "react-redux";
import { useWebSocket } from "../../hooks/useWebSocket";
import { setNewMessage, updateMessage } from "./../../store/conversations";
import { updateMessage as apiUpdatedMessage } from "./../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
    position: 'relative',
  },
  chatContainer: {
    // marginLeft: 41,
    // marginRight: 41,
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
    height: 'calc(100vh - 215px)',
    justifyContent: "space-between",
    overflowX: "auto",
    padding: theme.spacing(2),
    marginTop: 115,
    // paddingBottom: 100,
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = useMemo(() => props.conversation, [props.conversation]) //props.conversation || {};
  const { socket, emitMessageUpdated } = useWebSocket();
  const dispatch = useDispatch();
  /**
   * Send request to the server to updated a given message
   */
  const updateMessageInServer = useCallback((id, body) => {
    dispatch(apiUpdatedMessage(id, {
      recipientId: conversation?.otherUser.id,
      ...body
    }, emitMessageUpdated))
  }, [dispatch, conversation, emitMessageUpdated]);

  const addMessagesToConversation = useCallback(({ message, recipientId, sender }) => {
    dispatch(setNewMessage(message, null));

    if (!socket) return;
    // emit update message event to update the status of message to received
    if (message.status === "read") return;
    updateMessageInServer(message.id, {...message,status: "received"});
  }, [dispatch, socket, updateMessageInServer]);

  /** Update message is the server emit update-message envent */
  const updateMessageInConversationStore = useCallback((message) => {

    dispatch(updateMessage(message))
  }, [dispatch])

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", addMessagesToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessagesToConversation]);

  useEffect(() => {
    if (!socket) return;

    socket.on('updated-message', updateMessageInConversationStore);

    return () => socket.off("updated-message");
  }, [socket, updateMessageInConversationStore])

  return (
    <Box className={classes.root}>
      {conversation?.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
