import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import { styled, Box } from "@mui/material";
// import { prisma } from "@/lib/prismaClient";

import CategoryForm from "@/components/CategoryForm";
import CompositionForm from "@/components/CompositionForm";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export default function EditAdminPage() {
  const [compositionData, setCompositionData] = useState(null);
  const [goToAdmins, setGoToAdmins] = useState(false);
  const router = useRouter();
  const id = router.query?.id[0];
  const categoryId = router.query?.categId;
  console.log(router);
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
        const data = response.data;
        setCompositionData(data);
        console.log(data);
      } catch (error) {
        console.log(`💥💥💥${error}`);
      }
    }
    if (id && id[0]) {
      getCompositionData();
    }
  }, [id, categoryId]);
  console.log(compositionData);

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   async function getAdminData() {
  //     try {
  //       const response = await axios.get("/api/admin2?id=" + id[0]);
  //       console.log(response);
  //     } catch (error) {
  //       console.log(`💥💥${error}`);
  //     }
  //   }
  //   getAdminData();
  // }, [id]);

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

        {compositionData && <CompositionForm {...compositionData} />}
      </Box>
    </Layout>
  );
}

// export const getServerSideProps = async () => {
//   const admin = await prisma.user.findUnique({
//     where: {
//       role: "ADMIN",
//     },
//   });
//   return { props: { admin } };
// };
