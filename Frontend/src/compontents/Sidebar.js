import React from "react";
import { Drawer, List, ListItem } from "@mui/material";
import { Typography } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BoltIcon from "@mui/icons-material/Bolt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";

const Sidebar = () => {
  const drawerWidth = 240;
  const nav = useNavigate();
  // Sidebar links
  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon color="primary" />,
      path: "/HobbyHub/main/home",
    },
    {
      text: "Posts",
      icon: <DashboardIcon color="primary" />,
      path: "/HobbyHub/main/home",
    },
    {
      text: "Trending",
      icon: <BoltIcon color="primary" />,
      path: "/HobbyHub/main/home",
    },
    {
      text: "Chats",
      icon: <ChatIcon color="primary" />,
      path: "/HobbyHub/main/chats",
    },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "secondary",
          boxSizing: "border-box",
        },
        backgroundColor: "secondary",
      }}
      PaperProps={{
        style: {
          backgroundColor: "#f2f2f2",
        },
      }}
      variant="permanent"
      anchor="left"
      color="secondary"
    >
      <img src="../images/logo.png" alt="logo" />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} onClick={() => nav(item.path)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography sx={{ color: "text.secondary" }}>
                {item.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
