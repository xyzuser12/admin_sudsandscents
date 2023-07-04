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
export default function DeleteCompositionPage() {
  const [compositionName, setCompositionName] = useState("");
  const router = useRouter();
  console.log(router);
  const id = router.query?.id[0];
  const categoryId = router.query.categId;
  console.log(id);
  console.log(categoryId);
  useEffect(() => {
    async function getCompositionData() {
      try {
        const response = await axios.get("/api/composition", {
          params: {
            id,
            categoryId,
          },
        });
        const data = response.data.name;
        setCompositionName(data);
      } catch (error) {
        console.log(`💥💥💥${error}`);
      }
    }
    if (id && id[0]) {
      getCompositionData();
    }

    // if (!id) {
    //   return;
    // }
    // axios.get("/api/admins?id=" + id).then((response) => {
    //   setAdminInfo(response.data);
    // });
  }, [id]);
  console.log(compositionName);

  function goBack() {
    router.push("/categories/edit/" + categoryId);
  }
  async function deleteComposition() {
    if (categoryId && id) {
      await axios.delete("/api/composition", {
        params: {
          id,
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
        {compositionName && (
          <h1 className="text-center">
            Do you really want to delete composition &nbsp;&quot;
            {compositionName}
            &quot;?
          </h1>
        )}
        <div className="flex gap-2 justify-center">
          <button onClick={deleteComposition} className="btn-red">
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
