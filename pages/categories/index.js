import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled, Box, Button } from "@mui/material";

import * as React from "react";
import Image from "next/image";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export default function CategoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/categories2").then((response) => {
      setCategories(response.data);
      setIsLoading(false);
    });
  }, []);
  console.log(categories);
  const addNewCategoryHandler = (e) => {
    e.preventDefault();
    router.push("/categories/new");
  };

  // async function deleteAdmin() {
  //   await axios.delete("/api/admins?id=" + id);
  //   goBack();
  // }
  // console.log(admins);
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
        {isLoading && <Spinner />}
        {!isLoading && (
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
                onClick={addNewCategoryHandler}
              >
                Add new category
              </Button>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{}} aria-label="spanning table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F8F8F8" }}>
                    <TableCell>Category name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories &&
                    categories.map((category) => {
                      // console.log(product);
                      return (
                        <TableRow
                          key={category.id}
                          sx={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <TableCell sx={{ borderBottom: "none" }}>
                            {category.name}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <Link
                                className="btn-default"
                                href={"/categories/edit/" + category.id}
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
                                href={"/categories/delete/" + category.id}
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
                              <Link
                                className="btn-red"
                                href={"/categories/edit/" + category.id}
                                style={{
                                  display: "flex",
                                  color: "rgb(1, 67, 97",
                                  backgroundColor: "#E5F6FD",
                                }}
                              >
                                <p>Add composition</p>
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
        )}
        {/* <Link className="btn-primary" href={"/admins/new"}>
          Add new admin
        </Link> */}
        {/* <table className="basic mt-2">
          <thead>
            <tr>
              <td>Email</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.email}</td>
                <td>
                  <Link
                    className="btn-default"
                    href={"/admins/edit/" + admin._id}
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
                    Edit
                  </Link>
                  <Link
                    className="btn-red"
                    href={"/admins/delete/" + admin._id}
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
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </Box>
    </Layout>
  );
}
