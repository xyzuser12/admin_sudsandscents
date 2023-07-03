import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import { styled, Box } from "@mui/material";
// import { prisma } from "@/lib/prismaClient";

import AdminForm from "@/components/AdminForm";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export default function EditAdminPage() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [goToAdmins, setGoToAdmins] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  // console.log(id[0]);
  // console.log(adminInfo);
  useEffect(() => {
    async function getAdminData() {
      try {
        const response = await axios.get("/api/admin2", {
          params: {
            id: id[0],
          },
        });
        const data = response.data;
        setAdminInfo(data);
        // console.log(data);
      } catch (error) {
        console.log(`💥💥💥${error}`);
      }
    }
    if (id && id[0]) {
      getAdminData();
    }
  }, [id]);

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

        {adminInfo && <AdminForm {...adminInfo} />}
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
