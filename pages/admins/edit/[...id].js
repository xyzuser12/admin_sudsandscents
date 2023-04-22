import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import AdminForm from "@/components/AdminForm";

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
      <h1>Edit admin</h1>
      {adminInfo && <AdminForm {...adminInfo} />}
    </Layout>
  );
}
