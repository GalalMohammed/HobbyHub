import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import AvatarWithStatus from "./AvatarWithStatus";
import { toggleMessagesPane } from "../utils.js/chatHandlers";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ChatListItem(props) {
  const { chat, type, selectedChatId, setSelectedChat } = props;
  const { user } = useAuthContext();
  let { recipient } = useFetchRecipient(chat, user, type);

  const selected = selectedChatId === chat._id;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat(chat);
          }}
          selected={selected}
          sx={{
            flexDirection: "column",
            alignItems: "initial",
            gap: 1,
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
              online={true}
              username={type === "exist" ? recipient?.username : chat.username}
            />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">
                {type === "exist" ? recipient?.username : chat.username}
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
                  }}
                >
                  messages
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: "right",
              }}
            >
              <Typography
                level="body-xs"
                display={{ xs: "none", md: "block" }}
                noWrap
              >
                5 min ago
              </Typography>
            </Box>
          </Stack>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
