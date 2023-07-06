import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";

import Layout from "@/components/Layout";
import Link from "next/link";
import { styled, Box, Button } from "@mui/material";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinner from "@/components/Spinner";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import classes from "../styles/dashboard/Admin.module.css";

const categRaw = [
  {
    id: 7,
    name: "test",
    description: "lorem lorem test",
  },
  {
    id: 8,
    name: "test",
    description: "lorem lorem test",
  },
  {
    id: 9,
    name: "test",
    description: "lorem lorem test",
  },
];

export default function ProductForm({
  id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  image: existingImage,
  milliliter: existingMilliliter,
  quantity: existingQuantity,
}) {
  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [selectedPicture, setSelectedPicture] = useState(existingImage || null);
  const [milliliter, setMilliliter] = useState(existingMilliliter || 0);
  const [quantity, setQuantity] = useState(existingQuantity || 0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedComposition, setSelectedComposition] = useState(null);

  const [goToCategories, setGoToCategories] = useState(false);
  const [rawPic, setRawPic] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [compositionData, setCompositionData] = useState([]);
  console.log(selectedCategories);
  console.log(selectedComposition);

  const router = useRouter();
  function transformToIds(categRaw) {
    return categRaw.map((item) => item.id);
  }
  useEffect(() => {
    if (id) {
      const imageData = Buffer.from(selectedPicture.data).toString("base64");
      setBase64Image(`data:image/jpeg;base64,${imageData}`);
    }
  }, [id]);

  useEffect(() => {
    async function getComposition() {
      if (selectedCategories.length) {
        await axios
          .get("/api/composition", {
            params: {
              mode: "NEW_INGREDIENT",
              categIds: JSON.stringify(transformToIds(selectedCategories)),
            },
          })
          .then((res) => {
            setCompositionData(res.data);
          });
      }
    }
    getComposition();
  }, [selectedCategories.length]);

  console.log(transformToIds(selectedCategories));
  console.log(id);
  // console.log(name);
  // console.log(description);
  // console.log(selectedPicture);
  // console.log(base64Image);
  // console.log(rawPic);
  // console.log(compoData);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRawPic(e.target.files[0]);
    const reader = new FileReader();
    console.log(file);

    reader.onloadend = () => {
      setSelectedPicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    // console.log(selectedPicture);
    setIsChangingImage(true);
  };
  useEffect(() => {
    async function getCategories() {
      await axios.get("/api/categories2").then((res) => {
        setCategoriesData(res.data);
      });
    }
    getCategories();
  }, []);
  console.log(categoriesData);
  useEffect(() => {
    async function postIngredients() {
      await axios.get("/api/products2");
    }
    postIngredients();
  }, []);
  // if (id) {
  //   async function getCompositionData() {
  //     const response = await axios.get("/api/product2", {
  //       params: {
  //         categoryId: id,
  //       },
  //     });
  //     const data = response.data;
  //     console.log(data);
  //     setCompoData(data);
  //   }
  //   getCompositionData();
  // }
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
  const transformCategories = (categRaw) => {
    return categRaw.map((item) => {
      return { id: item.id };
    });
  };
  const saveProductHandler = async (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    // const formData = new FormData();
    // formData.append("image", selectedProfilePicture);

    if (id) {
      //   //update
      console.log(id);
      try {
        // Use Axios PUT request to update the admin record
        let response;
        if (isChangingImage) {
          response = await axios.put("/api/products2", {
            name,
            description,
            price: parseFloat(price),
            image: selectedPicture ? selectedPicture.split(",")[1] : null,
            milliliter: parseInt(milliliter),
            quantity: parseInt(quantity),
            categories: JSON.stringify(transformCategories(selectedCategories)),
            composition: parseInt(selectedComposition.id),
            id,
            isChangingImage,
          });
        } else {
          response = await axios.put("/api/products2", {
            name,
            description,
            price: parseFloat(price),
            image: selectedPicture ? selectedPicture.split(",")[1] : null,
            milliliter: parseInt(milliliter),
            quantity: parseInt(quantity),
            categories: JSON.stringify(transformCategories(selectedCategories)),
            composition: parseInt(selectedComposition.id),
            id,
            isChangingImage,
          });
        }

        if (response.status === 200) {
          const categ = response.data;
          console.log("Category updated: ", categ);
          // Redirect to the admins page after successful update
          router.push("/categories");
        } else {
          console.error("Failed to update category", response.status);
        }
      } catch (error) {
        console.error("💥An error occurred", error);
      }
    } else {
      console.log("❤❤");
      try {
        const data = {
          name,
          description,
          price: parseFloat(price),
          image: selectedPicture ? selectedPicture.split(",")[1] : null,
          milliliter: parseInt(milliliter),
          quantity: parseInt(quantity),
          categories: JSON.stringify(transformCategories(selectedCategories)),
          composition: parseInt(selectedComposition.id),
        };
        console.log(data);
        const response = await axios.post("/api/products2", {
          ...data,
        });
        if (response.status === 200) {
          const categ = response.data;
          console.log("Cateogry uploaded:", categ);
        } else {
          console.error("Failed to upload category:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while uploading the category:", error);
      }
      // Handle error cases
    }
    // setGoToCategories(true);
  };

  // const addNewCompositionHandler = (e) => {
  //   e.preventDefault();
  //   router.push("/composition/new?categoryId=" + id);
  // };

  if (goToCategories) {
    router.push("/categories");
  }
  const cancelBtnHandler = () => {
    router.push("/products");
  };
  const top100Films = [
    { name: "The Shawshank Redemption", year: 1994 },
    { name: "The Godfather", year: 1972 },
  ];

  const top4Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  return (
    <div>
      <Paper
        sx={{ padding: "1.4rem", display: "flex", flexDirection: "column" }}
      >
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
                htmlFor="price"
                style={{
                  marginBottom: "4px",
                  color: "#adadad",
                  fontSize: "15px",
                }}
              >
                Price:
              </label>

              <OutlinedInput
                id="price"
                name="price"
                type="number"
                step="any"
                onChange={(ev) => setPrice(ev.target.value)}
                required
                value={price}
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
                htmlFor="milliliter"
                style={{
                  marginBottom: "4px",
                  color: "#adadad",
                  fontSize: "15px",
                }}
              >
                Milliliter:
              </label>

              <OutlinedInput
                id="milliliter"
                name="milliliter"
                type="number"
                onChange={(ev) => setMilliliter(ev.target.value)}
                required
                value={milliliter}
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
                htmlFor="quantity"
                style={{
                  marginBottom: "4px",
                  color: "#adadad",
                  fontSize: "15px",
                }}
              >
                Quantity:
              </label>

              <OutlinedInput
                id="quantity"
                name="quantity"
                type="number"
                onChange={(ev) => setQuantity(ev.target.value)}
                required
                value={quantity}
              />
            </div>
          </FormControl>
          <div>
            <label
              htmlFor="category"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Category:
            </label>
            <Autocomplete
              size="small"
              multiple
              id="category"
              options={categoriesData}
              getOptionLabel={(option) => option.name}
              value={selectedCategories} // Set the value prop to control the selected values
              onChange={(event, newValue) => {
                setSelectedCategories(newValue); // Update the state with the selected values
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label="Ca"
                  // placeholder="Category"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="composition"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Composition:
            </label>
            <Autocomplete
              size="small"
              id="composition"
              options={compositionData}
              groupBy={(option) => option.category.name}
              getOptionLabel={(option) => option.name}
              value={selectedComposition} // Set the value prop to control the selected values
              onChange={(event, newValue) => {
                setSelectedComposition(newValue); // Update the state with the selected values
              }}
              renderInput={(params) => <TextField {...params} />}
              renderGroup={(params) => (
                <li key={params.key}>
                  <div
                    style={{
                      backgroundColor: "#B4979D",
                      padding: "2px",
                      color: "#fff",
                    }}
                  >
                    <p style={{ marginLeft: "6px" }}>{params.group}</p>
                  </div>
                  <div>{params.children}</div>
                </li>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="categImage"
              style={{
                marginBottom: "4px",
                color: "#adadad",
                fontSize: "15px",
              }}
            >
              Price:
            </label>
            <input
              id="categImage"
              name="categImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {isChangingImage && selectedPicture && (
              <div>
                <h2>Selected Image:</h2>
                <img
                  src={URL.createObjectURL(rawPic)}
                  alt="Selected"
                  width={200}
                  height={200}
                />
              </div>
            )}
            {id && base64Image && !isChangingImage && (
              <img src={base64Image} alt="Image" width={200} height={200} />
            )}
          </div>
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
              alignSelf: "center",
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
              onClick={saveProductHandler}
            >
              Save
            </Button>
          </div>
        </div>
      </Paper>
      {/* {id && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ color: "#545454" }}>Composition:</h3>
          <Paper
            sx={{
              padding: "1.4rem",
              display: "flex",
              flexDirection: "column",
              marginTop: ".8rem",
            }}
          >
            <div className={classes["input-wrapper"]}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    backgroundColor: "#DE89A1",
                    borderRadius: "4px",
                    marginBottom: "1rem",
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
                    onClick={addNewCompositionHandler}
                  >
                    Add new composition
                  </Button>
                </div>

                <TableContainer component={Paper}>
                  <Table sx={{}} aria-label="spanning table">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#F8F8F8" }}>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {compoData &&
                        compoData.map((composition) => {
                          return (
                            <TableRow
                              key={composition.id}
                              sx={{
                                borderBottom:
                                  "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <TableCell sx={{ borderBottom: "none" }}>
                                {composition.name}
                              </TableCell>
                              <TableCell sx={{ borderBottom: "none" }}>
                                {composition?.description}
                              </TableCell>
                              <TableCell sx={{ borderBottom: "none" }}>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <Link
                                    className="btn-default"
                                    href={
                                      "/composition/edit/" +
                                      composition.id +
                                      "?categId=" +
                                      id
                                    }
                                    style={{
                                      display: "flex",
                                      backgroundColor: "#FFF4E5",
                                      color: "#9C7D51",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-4 h-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
                                    <p>Edit</p>
                                  </Link>
                                  <Link
                                    className="btn-red"
                                    href={
                                      "/composition/delete/" +
                                      composition.id +
                                      "?categId=" +
                                      id
                                    }
                                    style={{ display: "flex" }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-4 h-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                    <p>Delete</p>
                                  </Link>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                    
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Paper>
        </div>
      )} */}
    </div>
  );
}
