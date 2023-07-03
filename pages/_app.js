import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ThemeProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && !isUser) {
      router.push("/api/auth/signin");
    }
  }, [isUser, loading]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!loading && isUser) {
    return <>{children}</>;
  }
  return null;
}
