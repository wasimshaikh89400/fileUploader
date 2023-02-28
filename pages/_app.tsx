import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { useState } from "react";
import NextNProgress from "nextjs-progressbar";
import IconBundler from "../components/IconBundler/IconBundler";
import DashboardIcon from "../components/MenuIcons/DashboardIcon";
import FileUploadIcon from "../components/MenuIcons/FileUploadIcon";
import UserListIcon from "../components/MenuIcons/UserList";
import SettingIcon from "../components/MenuIcons/settingIcon";
import Logout from "../components/MenuIcons/LogoutIcon";
import { makeStyles } from "@mui/styles";
import Head from "next/head";

const useStyles = makeStyles({
  icon: {
    transition: "transform 0.5s ease-in-out",
    "&:hover": {
      transform: "rotate(30deg)",
    },
  },
});

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuItemsList = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "Upload Document",
    path: "/uploader",
    icon: <FileUploadIcon />,
  },
  {
    title: "File details",
    path: "/viewusers",
    icon: <UserListIcon />,
  },
];

const bottomMenuItemsList = [
  {
    title: "Settings",
    path: "/",
    icon: <SettingIcon />,
  },
  {
    title: "Logout",
    path: "/login",
    icon: <Logout />,
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const headerTiles: any = {
    uploader: "Upload Document",
    viewusers: "User Details",
  };

  return (
    <Box>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NextNProgress
        color={"#02AABD"}
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />
      {router.pathname !== "/login" && router.pathname !== "/register" ? (
        <Box sx={{ display: "flex", fontFamily: "Poppins, san-serif" }}>
          <CssBaseline />
          <AppBar
            style={{ background: "rgb(240,240,240)", color: "#02AABD" }}
            position="fixed"
            open={open}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
                noWrap
                component="div"
              >
                {headerTiles[
                  router.pathname.split("/")[1] as unknown as number
                ] || "Dashboard"}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                background: "linear-gradient(#02aab0,#00cdac)",
                color: "white",
              },
            }}
            variant="permanent"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {menuItemsList.map((item, index) => (
                <ListItem
                  key={item.title}
                  disablePadding
                  sx={{ display: "block", marginBlock: 2 }}
                  onClick={() => router.push(item.path)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#ffffff",
                      }}
                      className={classes.icon}
                    >
                      <IconBundler icon={item.icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
              {bottomMenuItemsList.map((item, index) => (
                <ListItem
                  key={item.title}
                  disablePadding
                  sx={{ display: "block", marginBlock: 2 }}
                  onClick={() => router.push(item.path)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#ffffff",
                      }}
                      className={classes.icon}
                    >
                      <IconBundler icon={item.icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Component {...pageProps} />
          </Box>
        </Box>
      ) : (
        <Component {...pageProps} />
      )}
    </Box>
  );
}

export default MyApp;
