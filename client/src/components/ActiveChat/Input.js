import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import { useWebSocket } from "../../hooks/useWebSocket";

const useStyles = makeStyles(theme => ({
  root: {
    // justifySelf: "flex-end",
    // marginTop: 15,
    position: 'absolute',
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    width: '100%',
    padding: "10px 10px",
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    // marginBottom: 20,
  },
}));

const Input = (props) => {
  const [text, setText] = useState("");
  const classes = useStyles();
  const ws = useWebSocket();

  const handleChange = (event) => setText(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.text.value) return;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : props.user,
    };
    await props.postMessage(reqBody, ws.sendMessage);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          onKeyDown={() => ws.socket.emit('typing', { to: props.otherUser.id })}
        />
      </FormControl>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message, emitSendMessage) => {
      dispatch(postMessage(message, emitSendMessage));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
