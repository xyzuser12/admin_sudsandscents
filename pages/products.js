import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { styled, Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import classes from "../styles/products/AllProducts.module.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Image",
    width: 80,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      // console.log(params),
      <Image
        src={params.row.image.src}
        alt={params.row.name}
        width="24"
        height="24"
      />
    ),
  },
  { field: "name", headerName: "Name", width: 130 },
  { field: "price", headerName: "Price", width: 130 },
  { field: "category", headerName: "Category", width: 130 },

  // {
  //   field: "status",
  //   headerName: "Status",
  //   sortable: false,
  //   width: 150,
  // },
  {
    field: "actions",
    headerName: "Action buttons",
    width: 150,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const handleEdit = () => {
        console.log("Edit clicked for row ", params.id);
      };
      const handleDelete = () => {
        console.log("Delete clicked for row ", params.id);
      };
      return (
        <div>
          <IconButton aria-label="edit" size="small" onClick={handleEdit}>
            <EditIcon
              sx={{
                "&:hover": { color: "#00BF63", transition: ".2s all ease" },
              }}
            />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={handleDelete}>
            <DeleteIcon
              sx={{
                "&:hover": { color: "#FF5757", transition: ".2s all ease" },
              }}
            />
          </IconButton>
        </div>
      );
    },
  },
];

const prod = [
  {
    category: "644394fab64cd2f3cba957f4",
    createdAt: "2023-04-22T08:36:33.750Z",
    description: "Jojoba",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682152601/jojoba_ut9swd.png",
    price: 1,
    quantity: 103,
    title: "Jojoba",
    updatedAt: "2023-04-22T08:36:33.750Z",
    __v: 0,
    _id: "64439c91c1145f3704a15c02",
  },
  {
    category: "6443979dc1145f3704a15b8f",
    createdAt: "2023-04-22T08:45:27.093Z",
    description: "sweet almond",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682153133/sweet_almond_q0sgul.png",
    price: 1,
    quantity: 12345,
    title: "Sweet Almond",
    updatedAt: "2023-04-22T08:45:27.093Z",
    __v: 0,
    _id: "64439ea7c1145f3704a15c0a",
  },
  {
    category: "6443979dc1145f3704a15b8f",
    createdAt: "2023-04-22T08:46:35.532Z",
    description: "coconut",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682153202/coconut_ghircm.png",
    price: 1,
    quantity: 12345,
    title: "Coconut",
    updatedAt: "2023-04-22T08:46:35.532Z",
    __v: 0,
    _id: "64439eebc1145f3704a15c12",
  },
];

const categ = [
  {
    name: "Custom Perfume",
    properties: Array(0),
  },
  {
    name: "Flip Top",
    parent: {
      name: "Custom Body Lotion",
      properties: [],
      __v: 0,
      _id: "644397ccc1145f3704a15b93",
    },

    properties: {
      name: "Ingredients",

      values: ["1st Scent", " 2nd Scent", " 3rd Scent"],
    },

    __v: 0,
    _id: "6443984dc1145f3704a15b97",
  },
  {
    name: "Oil-based",
    parent: {
      name: "Custom Perfume",

      properties: [],
      __v: 0,

      _id: "64438fdcc1145f3704a15b75",
    },

    properties: {
      name: "Ingredients",
      values: ["Carrier Oils", " Essential Oils", " Fixatives"],
    },

    __v: 0,
    _id: "6443979dc1145f3704a15b8f",
  },
];
export default function Products() {
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  console.log(products);

  useEffect(() => {
    const rowData = products.map((product) => {
      return product;
    });
    // console.log(rowData);
  }, [products]);

  // console.log(categories);
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
        <Link className="btn-primary" href={"/products/new"}>
          Add new product
        </Link>
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Product name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>
                  <Link
                    className="btn-default"
                    href={"/products/edit/" + product._id}
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
                    href={"/products/delete/" + product._id}
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
        </table>
        {/* <div className={classes.header}>
          <div>
            <h4 style={{ color: "#545454", fontSize: "1.4rem", margin: "0" }}>
              Overview
            </h4>
            <p style={{ color: "#9B9988", fontSize: "16px", marginTop: "4px" }}>
              Manage your store and increase your sales.
            </p>
          </div>
          <Link href="/products/new">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon sx={{ color: "#fff", fontSize: "8px" }} />}
              sx={{
                color: "#fff",
                fontSize: "13px",
                textTransform: "none",
              }}
            >
              Add Product
            </Button>
          </Link>
        </div>
        <div style={{ height: "80vh", width: "100%", marginTop: "1.8rem" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div> */}
      </Box>
      {/* <Link className="btn-primary" href={"/products/new"}>
        Add new product
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link
                  className="btn-default"
                  href={"/products/edit/" + product._id}
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
                  href={"/products/delete/" + product._id}
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
    </Layout>
  );
}
