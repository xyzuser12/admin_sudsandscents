import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";

import Layout from "@/components/Layout";
import AdminForm from "@/components/AdminForm";

export default function NewAdminPage() {
  return (
    <Layout>
      <h1>New Admin</h1>
      <AdminForm />
    </Layout>
  );
}
