import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import TypingBox from "./TypingBox";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} {...message} time={time} />
        ) : (
          <OtherUserBubble key={message.id} {...message} time={time} otherUser={otherUser} />
        );
      })}
      <TypingBox user={otherUser} />
    </Box>
  );
};

export default Messages;
