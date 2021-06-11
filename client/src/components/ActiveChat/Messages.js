import React, { useEffect, useRef } from "react";
import { Box, Chip } from "@material-ui/core";
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
  const { messages, otherUser, userId, firstUnreadId } = props;
  const classes = useStyles();
  const bottomRef = useRef();
  const unreadRef = useRef();

  const scrollDown = () => {
    const scrollRef = unreadRef.current ?? bottomRef.current;
    scrollRef.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    //TODO: Check whether user is reading prev messages:
    scrollDown();
  }, [messages.length, otherUser, firstUnreadId]);

  return (
    <Box className={classes.root}>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).calendar().replace("Today at ", "");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : message.id === firstUnreadId && firstUnreadId !== messages[messages.length - 1].id && firstUnreadId !== messages[0].id ? (
          <Box key={message.id}>
            <Box display="flex" justifyContent="center">
              <Chip ref={unreadRef} label="previous messages above" disabled />
            </Box>
            <OtherUserBubble text={message.text} time={time} otherUser={otherUser} />
          </Box>
        ) : (
          <Box key={message.id}>
            <OtherUserBubble text={message.text} time={time} otherUser={otherUser} />
          </Box>
        )
          ;
      })}
      <Box ref={bottomRef} />
    </Box>
  );
};

export default Messages;
