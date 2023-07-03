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
  const [adminName, setAdminName] = useState();
  const { id } = router.query;
  const adminId = id[0];
  console.log(adminId);
  useEffect(() => {
    async function getAdminData() {
      try {
        const response = await axios.get("/api/admin2", {
          params: {
            id: id[0],
          },
        });
        const data = response.data.name;
        setAdminName(data);
      } catch (error) {
        console.log(`💥💥💥${error}`);
      }
      if (id && id[0]) {
      }
    }
    getAdminData();

    // if (!id) {
    //   return;
    // }
    // axios.get("/api/admins?id=" + id).then((response) => {
    //   setAdminInfo(response.data);
    // });
  }, [id]);
  console.log(adminName);

  function goBack() {
    router.push("/admins");
  }
  async function deleteAdmin() {
    if (adminId) {
      await axios.delete("/api/admin2", {
        params: {
          id: adminId,
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
        {adminName && (
          <h1 className="text-center">
            Do you really want to delete admin &nbsp;&quot;{adminName}
            &quot;?
          </h1>
        )}
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
