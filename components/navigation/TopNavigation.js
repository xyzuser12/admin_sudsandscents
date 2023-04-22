import React from "react";
import { useRouter } from "next/router";
import {
  styled,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  alpha,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountMenu from "./AccountMenu";

let navdrawerWidth = 0;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#fff",
  boxShadow: "none",
  elevation: "0",
  borderBottom: "1px solid #C8C6AF",
  padding: "1rem 0",
  ...(open && {
    marginLeft: navdrawerWidth,
    width: `calc(100% - ${navdrawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: "1px solid #C2BFA9",
  alignSelf: "center",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#C2BFA9",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const TopNavigation = ({ userSession, open, setOpen, drawerWidth }) => {
  // console.log(userSession);
  navdrawerWidth = drawerWidth;
  const { pathname } = useRouter();
  // console.log(pathname);
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: "800",
                fontSize: "30px",
                fontFamily: "var(--font-inter)",
                color: "#545454",
              }}
            >
              {" "}
              {pathname === "/"
                ? "Dashboard"
                : pathname === "/products/new"
                ? "Add New Product"
                : pathname.replace("/", "").charAt(0).toUpperCase() +
                  pathname.replace("/", "").slice(1)}
              {/* {pathname.replace("/", "").charAt(0).toUpperCase() +
                pathname.replace("/", "").slice(1)} */}
            </Typography>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* <AccountMenu userSession={userSession} /> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;
