import Layout from "@/components/Layout";
import { styled, Box } from "@mui/material";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import('../../components/Geolocation'), {
  ssr: false,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const GeolocationPage = () => {
  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "hidden",
          margin: "3rem 1rem",
        }}
      >
        <DrawerHeader />
        <MapWithNoSSR />
      </Box>
    </Layout>
  );
};

export default GeolocationPage;

