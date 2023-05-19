import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button } from "@mui/material";
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
    <Paper sx={{ padding: "1.4rem", display: "flex", flexDirection: "column" }}>
      <FormControl
        size="small"
        sx={{
          m: 1,
          width: "100%",
          margin: "0",
          "& div": {
            fontSize: "14px",
          },
        }}
      >
        <label
          htmlFor="email"
          style={{ marginBottom: "4px", color: "#adadad", fontSize: "15px" }}
        >
          Email:
        </label>

        <OutlinedInput
          id="email"
          name="email"
          type="text"
          onChange={(ev) => setEmail(ev.target.value)}
          required
          aria-describedby="number-error-text"
          value={email}
        />
      </FormControl>
      <div
        style={{
          marginTop: "1.4rem",
          backgroundColor: "#DE89A1",
          borderRadius: "4px",
          alignSelf: "end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: "#fff",
            fontSize: "13px",
            textTransform: "none",
            zIndex: "999",
          }}
          onClick={saveAdmin}
        >
          Save
        </Button>
      </div>
    </Paper>
  );
}
