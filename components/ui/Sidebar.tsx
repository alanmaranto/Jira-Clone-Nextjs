import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send email", "Drafts"];

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Typography variant="h4">Menú</Typography>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ padding: "5px 10px" }}></Box>
    </Drawer>
  );
};
