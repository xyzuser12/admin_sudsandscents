import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import { styled, Box } from "@mui/material";

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
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/admins?id=" + id).then((response) => {
      setAdminInfo(response.data);
    });
  }, [id]);

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
