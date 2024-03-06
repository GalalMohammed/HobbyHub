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
import MessagesList from "./MessagesList";
import { useFetchGroup } from "../hooks/useFetchGroup";

export default function MessagesPane(props) {
  const { selectedChat, chatType } = props;
  const { user } = useAuthContext();
  let { recipient, recipientId } = useFetchRecipient(selectedChat, user);
  let { group } = useFetchGroup(selectedChat._id);

  const { messages, sendNewMessage, onlineUsers } =
    React.useContext(ChatContext);
  const [textAreaValue, setTextAreaValue] = React.useState("");

  const online = onlineUsers?.some((user) => user.userId === recipientId);

  if (!recipient && !group)
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
      <MessagesPaneHeader
        username={chatType === "private" ? recipient?.username : group?.name}
        src={chatType === "group" && group?.icon_url}
        online={online}
        groupCat={chatType === "group" && group?.category}
      />
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
          {messages?.map((message, index) => (
            <MessagesList
              key={index}
              message={message}
              index={index}
              recipient={recipient}
              group={group}
              online={online}
            />
          ))}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => sendNewMessage(textAreaValue, user, selectedChat._id)}
      />
    </Sheet>
  );
}
