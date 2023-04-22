import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";
import { styled, Box, Typography, Button } from "@mui/material";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export default function NewProduct() {
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
        <h1>New Product</h1>
        <ProductForm />
      </Box>
    </Layout>
  );
}
