import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button } from "@mui/material";
import axios from "axios";
import classes from "../styles/dashboard/Admin.module.css";

export default function AdminForm({
  id,
  name: existingName,
  username: existingUsername,
  email: existingEmail,
  phone_number: existingPhoneNumber,
  password: existingPassword,
}) {
  const [name, setName] = useState(existingName || "");
  const [username, setUsername] = useState(existingUsername || "");
  const [email, setEmail] = useState(existingEmail || "");
  const [phoneNumber, setPhoneNumber] = useState(existingPhoneNumber || "");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [goToAdmins, setGoToAdmins] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  // console.log(props);
  const router = useRouter();

  console.log(id);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(file);

    reader.onloadend = () => {
      setSelectedProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(selectedProfilePicture);
  };
  // useEffect(() => {
  //   async function getAdminData() {
  //     try {
  //       const response = await axios.get("/api/admin2");
  //       const data = response.data;
  //       console.log(data);
  //       const base64Image = `data:image/jpeg;base64,${data[0].image.data}`;
  //       console.log(base64Image);
  //     } catch (error) {
  //       console.log(`💥💥💥${error}`);
  //     }
  //   }
  //   getAdminData();
  // }, []);

  const saveAdminHandler = async (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    // const formData = new FormData();
    // formData.append("image", selectedProfilePicture);

    const data = {
      name,
      username,
      email,
      phoneNumber,
      password,
      image: selectedProfilePicture
        ? selectedProfilePicture.split(",")[1]
        : null,
    };

    if (id) {
      //   //update
      console.log(data);
      console.log(id);
      try {
        // Use Axios PUT request to update the admin record
        const response = await axios.put("/api/admin2", { ...data, id });
        if (response.status === 200) {
          const admin = response.data;
          console.log("Admin updated: ", admin);
          // Redirect to the admins page after successful update
          router.push("/admins");
        } else {
          console.error("Failed to update admin", response.status);
        }
      } catch (error) {
        console.error("💥An error occurred", error);
      }
    } else {
      console.log("❤❤");
      try {
        const response = await axios.post("/api/admin2", {
          ...data,
        });
        if (response.status === 200) {
          const admin = response.data;
          console.log("Admin uploaded:", admin);
        } else {
          console.error("Failed to upload admin:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while uploading the admin:", error);
      }
      // Handle error cases
    }
    setGoToAdmins(true);
  };
  if (goToAdmins) {
    router.push("/admins");
  }
  return (
    <Paper sx={{ padding: "1.4rem", display: "flex", flexDirection: "column" }}>
      <div className={classes["input-wrapper"]}>
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
          <div className={classes.input}>
            <label
              htmlFor="name"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Name:
            </label>

            <OutlinedInput
              id="name"
              name="name"
              type="text"
              onChange={(ev) => setName(ev.target.value)}
              required
              value={name}
            />
          </div>
        </FormControl>
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
          <div className={classes.input}>
            <label
              htmlFor="username"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Username:
            </label>

            <OutlinedInput
              id="username"
              name="username"
              type="text"
              onChange={(ev) => setUsername(ev.target.value)}
              required
              value={username}
            />
          </div>
        </FormControl>
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
          <div className={classes.input}>
            <label
              htmlFor="email"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Email:
            </label>

            <OutlinedInput
              id="email"
              name="email"
              type="text"
              onChange={(ev) => setEmail(ev.target.value)}
              required
              value={email}
            />
          </div>
        </FormControl>
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
          <div className={classes.input}>
            <label
              htmlFor="phoneNumer"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Phone number:
            </label>

            <OutlinedInput
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={(ev) => setPhoneNumber(ev.target.value)}
              required
              value={phoneNumber}
            />
          </div>
        </FormControl>
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
          <div className={classes.input}>
            <label
              htmlFor="password"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Password:
            </label>

            <OutlinedInput
              id="password"
              name="password"
              type="text"
              onChange={(ev) => setPassword(ev.target.value)}
              required
              value={password}
            />
          </div>
        </FormControl>
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
          <div className={classes.input}>
            <label
              htmlFor="cPassword"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Confirm password:
            </label>

            <OutlinedInput
              id="cPassword"
              name="cPassword"
              type="text"
              onChange={(ev) => setCPassword(ev.target.value)}
              required
              value={cPassword}
            />
          </div>
        </FormControl>
        <div>
          <label
            htmlFor="profilePic"
            style={{
              marginBottom: "4px",
              color: "#adadad",
              fontSize: "15px",
            }}
          >
            Profile picture:
          </label>
          <input
            id="profilePic"
            name="profilePic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* <button onClick={handleUpload}>Upload</button> */}
        </div>
      </div>
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
          onClick={saveAdminHandler}
        >
          Save
        </Button>
      </div>
    </Paper>
  );
}
