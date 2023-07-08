import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, FormHelperText } from "@mui/material";
import axios from "axios";
import classes from "../styles/dashboard/Admin.module.css";

export default function CompositionForm({
  id,
  categoryId,
  name: existingName,
  description: existingDescription,
  ingredientsLimit: existingIngredientsLimit,
}) {
  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [ingredientsLimit, setIngredientsLimit] = useState("");
  const [goToAdmins, setGoToAdmins] = useState(false);
  // console.log(props);
  const router = useRouter();

  const newCompoCategId = router.query?.categoryId;

  console.log(router);

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

  const saveCompositionHandler = async (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    // const formData = new FormData();
    // formData.append("image", selectedProfilePicture);

    const data = {
      name,
      description,
    };

    if (id && categoryId) {
      //   //update
      console.log(data);
      console.log(id);
      try {
        // Use Axios PUT request to update the admin record
        const response = await axios.put("/api/composition", {
          ...data,
          id,
        });
        if (response.status === 200) {
          const admin = response.data;
          console.log("Composition updated: ", admin);
          // Redirect to the admins page after successful update
          router.push("/categories/edit" + id);
        } else {
          console.error("Failed to update composition", response.status);
        }
      } catch (error) {
        console.error("💥An error occurred", error);
      }
    }
    if (newCompoCategId && !id) {
      console.log("❤❤");
      try {
        const response = await axios.post("/api/composition", {
          ...data,
          newCompoCategId,
        });
        if (response.status === 200) {
          const admin = response.data;
          console.log("Composition uploaded:", admin);
        } else {
          console.error("Failed to upload composition:", response.status);
        }
      } catch (error) {
        console.error(
          "An error occurred while uploading the composition:",
          error
        );
      }
      // Handle error cases
    }
    setGoToAdmins(true);
  };
  if (goToAdmins) {
    if (newCompoCategId) {
      router.push("/categories/edit/" + newCompoCategId);
    }
    if (categoryId && id) {
      router.push("/categories/edit/" + categoryId);
    }
  }

  const cancelBtnHandler = () => {
    if (newCompoCategId) {
      router.push("/categories/edit/" + newCompoCategId);
    }
    if (categoryId && id) {
      router.push("/categories/edit/" + categoryId);
    }
  };
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
              htmlFor="description"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Description:
            </label>

            <OutlinedInput
              id="description"
              name="description"
              type="text"
              onChange={(ev) => setDescription(ev.target.value)}
              required
              value={description}
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
              htmlFor="description"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Ingredients Limit:
            </label>

            <OutlinedInput
              id="description"
              name="description"
              type="text"
              onChange={(ev) => setIngredientsLimit(ev.target.value)}
              required
              value={ingredientsLimit}
            />
            <FormHelperText>
              Specify the limit of ingredients the user can pick for each
              composition.
            </FormHelperText>
          </div>
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "4px",
            alignSelf: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              color: "#DE89A1",
              fontSize: "14px",
              textTransform: "none",
              zIndex: "999",
            }}
            onClick={cancelBtnHandler}
          >
            Cancel
          </button>
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
            onClick={saveCompositionHandler}
          >
            Save
          </Button>
        </div>
      </div>
    </Paper>
  );
}
