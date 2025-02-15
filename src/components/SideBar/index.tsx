import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactElement } from "react";

export type TOptions = {
  callback: (text: string) => void;
  icon: string | ReactElement;
  text: string;
};

type TSidebarProps = {
  options: TOptions[];
  toggle: (state?: boolean) => void;
  state: boolean;
};

export default function Sidebar(props: TSidebarProps) {
  return (
    <Drawer
      sx={{ alignItems: "flex-start", justifyContent: "flex-start" }}
      open={props.state}
      onClose={() => props.toggle(false)}
    >
      {props.options.map((opt) => (
        <Box
          key={opt.text}
          sx={{ minWidth: 250 }}
          component={"div"}
          role="presentation"
        >
          <List>
            <ListItem
              key={opt.text}
              disablePadding
              onClick={() => {
                opt.callback(opt.text);
                props.toggle(false);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{opt.icon}</ListItemIcon>
                <ListItemText primary={opt.text} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      ))}
    </Drawer>
  );
}
