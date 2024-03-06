import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import AvatarWithStatus from "./AvatarWithStatus";
import { toggleMessagesPane } from "../utils/chatHandlers";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { getRequest } from "../utils/services";
import { ChatContext } from "../context/chatContext";
import moment from "moment";
import { useFetchGroup } from "../hooks/useFetchGroup";

export default function GroupChatListItem(props) {
  let { chat, type, selectedChatId, setSelectedChat } = props;
  const { createGroupChat, onlineUsers, newMessage, chats, messages } =
    React.useContext(ChatContext);
  const [currentMessages, setCurrentMessages] = useState([]);
  const { user } = useAuthContext();
  let { recipient, recipientId } = useFetchRecipient(chat, user, type);
  let { group } = useFetchGroup(chat._id, type);

  const selected = selectedChatId === chat._id;

  useEffect(() => {
    const getChatMessages = async () => {
      if (type === "exist") {
        const res = await getRequest(`/api/messages/${chat?._id}`);
        if (res.error) console.log(res.error);
        setCurrentMessages(res);
      }
    };
    getChatMessages();
  }, [newMessage, chats, messages]);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            if (type === "potential") {
              createGroupChat(chat.id, chat.members);
            } else setSelectedChat(chat);
          }}
          selected={selected}
          sx={{
            flexDirection: "column",
            alignItems: "initial",
            gap: 1,
            // backgroundColor: "#f6d3d5 !important",

            "&.Mui-selected": {
              backgroundColor: "#f6d3d5",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "#f6d3d5",
            },
            "&:hover": {
              backgroundColor: "#f6d3d5",
            },
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus
              online={onlineUsers?.some((user) => chat?.members.includes(user))}
              username={type === "exist" ? group?.name : chat.name}
              src={type === "exist" ? group?.icon_url : chat.icon_url}
            />
            <Box sx={{ flex: 1, width: "20px" }}>
              <Typography level="title-sm">
                {type === "exist" ? group?.name : chat.name}
              </Typography>
              {type === "exist" && (
                <Typography
                  level="body-sm"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "160px",
                  }}
                >
                  {currentMessages[currentMessages.length - 1]?.text}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: "right",
              }}
            >
              {/* {messages[0].unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )} */}
              <Typography
                level="body-xs"
                display={{ xs: "none", md: "block" }}
                noWrap
              >
                {currentMessages.length > 0 &&
                  moment(
                    currentMessages[currentMessages.length - 1]?.createdAt
                  ).fromNow()}
              </Typography>
            </Box>
          </Stack>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
