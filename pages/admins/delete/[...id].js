import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <h1 className="text-center">
        Do you really want to delete admin &nbsp;&quot;{adminInfo?.email}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteAdmin} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
