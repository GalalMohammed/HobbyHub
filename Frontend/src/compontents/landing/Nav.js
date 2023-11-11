import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

const drawerWidth = 240;
const navItems = ["Home", "Features", "About"];

function Nav(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const nav = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <AnchorLink href={"#" + item}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                // onClick={() => navigate(`#${item}`)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </AnchorLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginTop: "-70px" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundColor: "white", color: "black" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="../../HobbyHub/images/logoWhite.png"
            alt="logo"
            style={{
              // flexGrow: 1,
              display: { xs: "none", sm: "block" },
              width: "250px",
              marginRight: "auto",
            }}
          />
          <Box
            sx={{ display: { xs: "none", sm: "block" }, marginRight: "auto" }}
          >
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#000" }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ marginRight: "10px", borderRadius: "20px" }}
              onClick={() => nav("/HobbyHub/signin")}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography></Typography>
      </Box>
    </Box>
  );
}

Nav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Nav;
