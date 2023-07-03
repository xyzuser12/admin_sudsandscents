import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import LogIn from "./LogIn";

import { useRouter } from "next/router";
import { useTheme, Box, CssBaseline } from "@mui/material";
import Navigation from "@/components/navigation/Navigation";
import TopNavigation from "@/components/navigation/TopNavigation";

const drawerWidth = 240;
export default function Layout({ children }) {
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [userSessionData, setUserSessionData] = useState();

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { data: session, status } = useSession();
  // console.log(router);
  // console.log(status);
  // useEffect(() => {
  //   if (status !== "authenticated") {
  //     router.push("/login");
  //   }
  // }, [status]);

  // if (typeof window === "undefined" || status !== "authenticated") {
  //   // Return a loading state or redirect to a login page
  //   return null;
  // }

  //   if (status !== "authenticated") {
  //     router.push("/login");
  //   }

  if (status === "authenticated") {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopNavigation
          userSession={userSessionData}
          open={open}
          setOpen={setOpen}
          drawerWidth={drawerWidth}
        />
        <Navigation
          open={open}
          setOpen={setOpen}
          drawerWidth={drawerWidth}
          theme={theme}
        />
        {children}
      </Box>
    );
  } else {
    return <LogIn />;
  }
  // <div className="bg-bgGray min-h-screen ">
  //   <div className="block md:hidden flex items-center p-4">
  //     <button onClick={() => setShowNav(true)}>
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 24 24"
  //         fill="currentColor"
  //         className="w-6 h-6"
  //       >
  //         <path
  //           fillRule="evenodd"
  //           d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
  //           clipRule="evenodd"
  //         />
  //       </svg>
  //     </button>
  //     <div className="flex grow justify-center mr-6">
  //       <Logo />
  //     </div>
  //   </div>
  //   <div className="flex">
  //     <Nav show={showNav} />
  //     <div className="flex-grow p-4">{children}</div>
  //   </div>
  // </div>
}
