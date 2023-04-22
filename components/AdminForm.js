import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AdminForm({ _id, email: existingEmail }) {
  const [email, setEmail] = useState(existingEmail || "");
  const [goToAdmins, setGoToAdmins] = useState(false);
  const router = useRouter();

  async function saveAdmin(e) {
    e.preventDefault();
    console.log(e.currentTarget);

    const data = {
      email,
    };
    if (_id) {
      //update
      console.log(data);
      await axios.put("/api/admins", { ...data, _id });
    } else {
      //create
      await axios.post("/api/admins", data);
    }
    setGoToAdmins(true);
  }
  if (goToAdmins) {
    router.push("/admins");
  }
  return (
    <form onSubmit={saveAdmin}>
      <label>Email</label>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
