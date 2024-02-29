import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { ChatContext } from "../context/chatContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import MessageInput from "./MessagesInput";

export default function MessagesPane(props) {
  const { chat } = props;
  const { user } = useAuthContext();
  let { recipient } = useFetchRecipient(chat, user);

  const { messages, sendNewMessage } = React.useContext(ChatContext);
  const [textAreaValue, setTextAreaValue] = React.useState("");

  if (!recipient)
    return (
      <div style={{ textAlign: "center", width: "100%" }}>
        Select a conversation
      </div>
    );

  return (
    <Sheet
      sx={{
        width: "800px",
        height: {
          xs: "calc(100dvh - var(--Header-height))",
          lg: "calc(100dvh - 100px)",
        },
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "white",
        marginLeft: "20px",
        backgroundColor: "#f2f2f2",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <MessagesPaneHeader username={recipient?.username} online={true} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack
          spacing={2}
          justifyContent="flex-end"
          sx={{
            borderStartEndRadius: "20px",
          }}
        >
          {messages?.map((message, index) => {
            const isYou = message?.senderId === user.userId;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}
              >
                {!isYou && (
                  <AvatarWithStatus
                    online={true}
                    username={recipient?.username}
                  />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  name={isYou ? user.username : recipient?.username}
                  {...message}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => sendNewMessage(textAreaValue, user, chat._id)}
      />
    </Sheet>
  );
}
