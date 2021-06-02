import React, { useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    height: "70vh",
    overflowY: "scroll"
  }
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    //TODO: Check whether user is reading prev messages:
    scrollToBottom();
  });

  return (
    <Box className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).calendar().replace("Today at ", "");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
      <Box ref={bottomRef} />
    </Box>
  );
};

export default Messages;
