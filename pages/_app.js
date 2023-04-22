import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DE89A1",
    },
    secondary: {
      main: "#DEB4BD",
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        {/* <Layout> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </SessionProvider>
    </ThemeProvider>
  );
}
