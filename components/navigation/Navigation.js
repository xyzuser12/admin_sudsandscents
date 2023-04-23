import { useRouter } from "next/router";
import {
  styled,
  Drawer as MuiDrawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CategoryIcon from "@mui/icons-material/Category";

import classes from "../../styles/navigation/Navigation.module.css";
let navDrawerWidth = 0;
const openedMixin = (theme) => ({
  width: navDrawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
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
  justifyContent: "space-between",
  padding: "2rem 0",
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: navDrawerWidth,
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

const Navigation = ({ open, setOpen, theme, drawerWidth }) => {
  navDrawerWidth = drawerWidth;
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#FBF3FC",
        },
      }}
    >
      <DrawerHeader
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className={classes.logo}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <p>Scents</p>{" "}
          <p>
            <span>&</span> Suds
          </p>
        </div>
        <IconButton
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "1rem 0",
        }}
      >
        <ListItem key="dashboard" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(router.pathname === "/" && {
                backgroundColor: "#E9D0CB",
              }),
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
            onClick={() => router.push("/")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem key="products" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(router.pathname === "/products" ||
              router.pathname === "/products/new"
                ? { backgroundColor: "#E9D0CB" }
                : { backgroundColor: "none" }),
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
            onClick={() => router.push("/products")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key="categories" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(router.pathname === "/categories"
                ? { backgroundColor: "#E9D0CB" }
                : { backgroundColor: "none" }),
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
            onClick={() => router.push("/categories")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key="customers" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(router.pathname === "/customers" && {
                backgroundColor: "#E9D0CB",
              }),
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
            onClick={() => router.push("/customers")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key="orders" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(router.pathname === "/orders" && {
                backgroundColor: "#E9D0CB",
              }),
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
            onClick={() => router.push("/orders")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key="admins" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(router.pathname === "/admins" && {
                backgroundColor: "#E9D0CB",
              }),
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
            onClick={() => router.push("/admins")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Admins" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="setting"
          disablePadding
          sx={{
            display: "block",
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(router.pathname === "/setting" && {
                backgroundColor: "#E9D0CB",
              }),
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
            onClick={() => router.push("/setting")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <MiscellaneousServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="logout"
          disablePadding
          sx={{
            display: "block",
            marginTop: "auto",
          }}
        >
          <ListItemButton
            onClick={() => signOut({ callbackUrl: "/" })}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              "&:hover, &:focus": { backgroundColor: "#E9D0CB" },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navigation;
