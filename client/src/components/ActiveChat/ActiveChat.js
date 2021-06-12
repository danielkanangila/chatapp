import React, { useCallback, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect, useDispatch } from "react-redux";
import { useWebSocket } from "../../hooks/useWebSocket";
import { setNewMessage, updateMessage } from "./../../store/conversations";
import { updateMessage as apiUpdatedMessage } from "./../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = useMemo(() => props.conversation, [props.conversation]) 
  const { socket, emitMessageUpdated } = useWebSocket();
  const dispatch = useDispatch();

  const updateMessageInServer = useCallback((id, body) => {
    /**
   * Send request to the server to updated a given message
   */
    dispatch(apiUpdatedMessage(id, {
      recipientId: conversation?.otherUser.id,
      ...body
    }, emitMessageUpdated))
  }, [dispatch, conversation, emitMessageUpdated]);

  const addMessagesToConversation = useCallback(({ message, recipientId, sender }) => {
      dispatch(setNewMessage(message, null));

      if (!socket) return;
      // emit update message event to update the status of message to received
      if (message.status === "read") return ;

      // if is active chat set status to read otherwise received
      const status = (conversation?.id === message.conversationId) ? "read" : "received";

      updateMessageInServer(message.id, {...message, status });
    }, [dispatch, socket, updateMessageInServer, conversation?.id]);

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
