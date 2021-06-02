import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { updateMessageReadStatus } from "../../store/utils/thunkCreators";

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
  const { user, updateMessageReadStatus } = props;
  const conversation = props.conversation || {};
  const firstUnreadIdRef = useRef();
  const handleActive = async () => {
    if (conversation?.messages) {
      const firstUnreadMessage = conversation.messages.find(message =>
        !message.isRead && message.senderId === conversation.otherUser.id
      );
      firstUnreadIdRef.current = firstUnreadMessage?.id || -1;
      //If found:
      if (firstUnreadMessage) {
        const targetMessages = conversation.messages.filter(message =>
          !message.isRead && message.senderId === conversation.otherUser.id
        );
        await updateMessageReadStatus(targetMessages);
      }
    }
  };


  useEffect(() => {
    handleActive();
  })

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              firstUnreadId={firstUnreadIdRef.current}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessageReadStatus: (messages) => {
      dispatch(updateMessageReadStatus(messages));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
