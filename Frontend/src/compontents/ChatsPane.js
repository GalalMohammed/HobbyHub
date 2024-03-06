import * as React from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Box, Button, Chip, IconButton, ToggleButtonGroup } from "@mui/joy";
import List from "@mui/joy/List";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import ChatListItem from "./ChatListItem";
import { ChatContext } from "../context/chatContext";

export default function ChatsPane(props) {
  const { chats, potentialChats, selectedChatId, setSelectedChat } = props;
  const [isGroupChats, setIsGroupChats] = React.useState("false");
  const { chatType, setChatType } = React.useContext(ChatContext);

  return (
    <Sheet
      className="try"
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        height: "calc(100dvh - 100px)",
        overflowY: "auto",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        pb={1.5}
      >
        <Typography
          fontSize={{ xs: "md", md: "lg" }}
          component="h1"
          fontWeight="lg"
          endDecorator={
            <Chip
              variant="soft"
              size="md"
              slotProps={{ root: { component: "span" } }}
              sx={{ backgroundColor: "#f6d3d5" }}
            >
              4
            </Chip>
          }
          sx={{ mr: "auto" }}
        >
          Messages
        </Typography>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          sx={{ display: { xs: "none", sm: "unset" } }}
        >
          <EditNoteRoundedIcon />
        </IconButton>
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "lg",
            display: "flex",
            gap: 2,
            p: 1,
            justifyContent: "center",
          }}
        >
          <ToggleButtonGroup
            variant="plain"
            spacing={1}
            sx={{
              width: "100%",
              borderRadius: "md",
            }}
            value={chatType}
            onChange={(event, type) => {
              event.target.parentNode.firstChild.classList.remove(
                "chatTypeBtn"
              );
              event.target.parentNode.firstChild.style.backgroundColor =
                "white";
              event.target.parentNode.lastChild.style.backgroundColor = "white";
              event.target.style.backgroundColor = "#d0242e";
              event.target.parentNode.firstChild.style.color = "black";
              event.target.parentNode.lastChild.style.color = "black";
              event.target.style.color = "white";
              setChatType(type);
            }}
            aria-label="text alignment"
          >
            <Button
              sx={{
                width: "100%",
                backgroundColor: "#d0242e",
              }}
              value="private"
              className="chatTypeBtn"
            >
              Chats
            </Button>
            <Button
              sx={{
                width: "100%",
              }}
              value="group"
            >
              Groups
            </Button>
          </ToggleButtonGroup>
        </Sheet>
      </Box>
      <List
        sx={{
          py: 0,
          "--ListItem-paddingY": "0.75rem",
          "--ListItem-paddingX": "1rem",
        }}
      >
        {chats?.length > 0 &&
          chats?.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              type="exist"
              setSelectedChat={setSelectedChat}
              selectedChatId={selectedChatId}
            />
          ))}
        {potentialChats?.length > 0 &&
          potentialChats?.map((pchat) => (
            <ChatListItem
              key={pchat._id}
              chat={pchat}
              type="potential"
              setSelectedChat={setSelectedChat}
              selectedChatId={selectedChatId}
            />
          ))}
      </List>
    </Sheet>
  );
}
