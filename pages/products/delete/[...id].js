import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled, Box } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export default function DeleteCategoryPage() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const { id } = router.query;
  const productId = parseInt(id[0]);
  console.log(productId);
  useEffect(() => {
    async function getProductData() {
      try {
        const response = await axios.get("/api/products2", {
          params: {
            id: productId,
          },
        });
        const data = response.data.name;
        setProductName(data);
      } catch (error) {
        console.log(`💥💥💥${error}`);
      }
    }
    if (id && id[0]) {
      getProductData();
    }

    // if (!id) {
    //   return;
    // }
    // axios.get("/api/admins?id=" + id).then((response) => {
    //   setAdminInfo(response.data);
    // });
  }, [id]);
  console.log(productId);

  function goBack() {
    router.push("/products");
  }
  async function deleteProductHandler() {
    if (productId) {
      await axios.delete("/api/products2", {
        params: {
          id: productId,
        },
      });
      goBack();
    }
  }
  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "hidden",
          margin: "8rem 1rem",
        }}
      >
        {productName && (
          <h1 className="text-center">
            Do you really want to delete product &nbsp;&quot;{productName}
            &quot;?
          </h1>
        )}
        <div className="flex gap-2 justify-center">
          <button onClick={deleteProductHandler} className="btn-red">
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
