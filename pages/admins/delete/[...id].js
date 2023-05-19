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
export default function DeleteProductPage() {
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState();
  const { id } = router.query;
  console.log(router);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/admins?id=" + id).then((response) => {
      setAdminInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push("/admins");
  }
  async function deleteAdmin() {
    await axios.delete("/api/admins?id=" + id);
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
          margin: "8rem 1rem",
        }}
      >
        <h1 className="text-center">
          Do you really want to delete admin &nbsp;&quot;{adminInfo?.email}
          &quot;?
        </h1>
        <div className="flex gap-2 justify-center">
          <button onClick={deleteAdmin} className="btn-red">
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
