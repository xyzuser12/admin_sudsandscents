import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled, Box, Typography, Button } from "@mui/material";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  console.log(router);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }
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
        <h1 className="text-center">
          Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
        </h1>
        <div className="flex gap-2 justify-center">
          <button onClick={deleteProduct} className="btn-red">
            Yes
          </button>
          <button className="btn-default" onClick={goBack}>
            NO
          </button>
        </div>
      </Box>
    </Layout>
  );
}
