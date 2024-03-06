import React, { useEffect } from "react";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import { ChatContext } from "../context/chatContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { getRequest } from "../utils/services";

function MessagesList(props) {
  const { message, online, index, recipient } = props;
  const { user } = useAuthContext();
  const { chatType } = React.useContext(ChatContext);

  const [sender, setSender] = React.useState("");

  useEffect(() => {
    const getSender = async (senderId) => {
      const sender = await getRequest(
        `http://127.0.0.1:8000/api/users/${senderId}`
      );
      if (sender.error) {
        console.log("error", sender.error);
      }
      setSender(sender);
    };
    getSender(message.senderId);
  }, [message]);

  const isYou = message?.senderId == user.userId;
  return (
    <Stack
      key={index}
      direction="row"
      spacing={2}
      flexDirection={isYou ? "row-reverse" : "row"}
    >
      {!isYou && (
        <AvatarWithStatus
          online={online}
          username={
            chatType === "group" ? sender?.username : recipient?.username
          }
        />
      )}
      <ChatBubble
        variant={isYou ? "sent" : "received"}
        name={
          isYou
            ? user.username
            : chatType === "group"
            ? sender?.username
            : recipient?.username
        }
        {...message}
      />
    </Stack>
  );
}

export default MessagesList;
