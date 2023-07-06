import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { styled, Box, Button } from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import { Oval } from "react-loader-spinner";
import Spinner from "../../components/Spinner";

import classes from "../../styles/products/AllProducts.module.css";
const styles = {
  header: {
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
  },
};
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Image",
    width: 80,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      console.log(params.row);
      const imageData = Buffer.from(params.row.image.data).toString("base64");
      return (
        <Image
          src={`data:image/jpeg;base64,${imageData}`}
          alt={params.row.name}
          width="40"
          height="40"
        />
      );
    },
  },

  { field: "name", headerName: "Name", width: 130 },
  {
    field: "price",
    headerName: "Price",
    width: 80,
    renderCell: (params) => {
      return <p>{`₱${params.row.price.toFixed(2)}`}</p>;
    },
  },
  { field: "milliliter", headerName: "Milliliter(ml)", width: 100 },
  { field: "quantity", headerName: "Quantity", width: 100 },
  { field: "category", headerName: "Category", width: 180 },
  { field: "composition", headerName: "Composition", width: 130 },

  {
    field: "actions",
    headerName: "Action buttons",
    width: 200,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <div className={classes["action-buttons-wrapper"]}>
          <Link
            className={`btn-default ${classes.edit}`}
            href={"/products/edit/" + params.id}
            style={{ zIndex: "999" }}
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
            <span>Edit</span>
          </Link>
          <Link
            className={`btn-red ${classes.delete}`}
            href={"/products/delete/" + params.id}
            style={{ zIndex: "999" }}
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
            <span>Delete</span>
          </Link>
        </div>
      );
    },
  },
];

const ingreRaw = [
  {
    category: [
      {
        id: 7,
        name: "test",
      },
      {
        id: 8,
        name: "test2",
      },
    ],

    composition: {
      id: 12,
      name: "test1",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsum",
    },
    compositionId: 12,
    createdAt: "2023-07-04T16:37:51.052Z",
    description: "lorem ipsum test",
    id: 16,
    image: null,
    milliliter: 50,
    name: "test",
    price: 100,
    quantity: 20,
    updatedAt: "2023-07-04T16:37:51.052Z",
  },
  {
    category: [
      {
        id: 7,
        name: "test",
      },
      {
        id: 8,
        name: "test2",
      },
    ],

    composition: {
      id: 13,
      name: "test1",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsum",
    },
    compositionId: 12,
    createdAt: "2023-07-04T16:37:51.052Z",
    description: "lorem ipsum test",
    id: 16,
    image: null,
    milliliter: 50,
    name: "test",
    price: 100,
    quantity: 20,
    updatedAt: "2023-07-04T16:37:51.052Z",
  },
];

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      await axios.get("/api/products2").then((res) => {
        setIngredientsData(res.data);
      });
    }
    getIngredients();
  }, []);
  console.log(ingredientsData);
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios.get("/api/products").then((response) => {
  //     setProducts(response.data);
  //     setIsLoading(false);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get("/api/categories").then((result) => {
  //     setCategories(result.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const rowData = products.map((product) => {
  //     return product;
  //   });
  // }, [products]);

  function transformIngredients(ingreRaw) {
    return ingreRaw.map((ingredient) => {
      const categoryNames = ingredient.category
        .map((cat) => cat.name)
        .join(", ");
      const compositionName = ingredient.composition.name;

      return {
        name: ingredient.name,
        category: categoryNames,
        id: ingredient.id,
        image: ingredient.image,
        milliliter: ingredient.milliliter,
        price: ingredient.price,
        composition: compositionName,
        quantity: ingredient.quantity,
      };
    });
  }
  console.log(transformIngredients(ingredientsData));
  // function formatProducts(prod, categ) {
  //   const formattedProducts = [];

  //   prod.forEach((p) => {
  //     const category = categ.find((c) => c._id === p.category);
  //     const parentCategory = category?.parent
  //       ? categ.find((c) => c._id === category.parent._id)
  //       : null;

  //     const formattedProduct = {
  //       id: p?._id,
  //       image: p?.image,
  //       name: p?.title,
  //       price: "P" + p?.price,
  //       ml: p.quantity,
  //       category: parentCategory ? parentCategory?.name : category?.name,
  //       subcategory: category?.name,
  //     };

  //     formattedProducts.push(formattedProduct);
  //   });

  //   return formattedProducts;
  // }
  // console.log(formatProducts(products, categories));
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

        <div className={classes.header}>
          <div>
            <h4 style={{ color: "#545454", fontSize: "1.4rem", margin: "0" }}>
              Overview
            </h4>
            <p style={{ color: "#9B9988", fontSize: "16px", marginTop: "4px" }}>
              Manage your store and increase your sales.
            </p>
          </div>
          <Link
            href="/products/new"
            style={{ backgroundColor: "#DE89A1", borderRadius: "4px" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon sx={{ color: "#fff", fontSize: "8px" }} />}
              sx={{
                color: "#fff",
                fontSize: "13px",
                textTransform: "none",
                zIndex: "999",
              }}
            >
              Add Product
            </Button>
          </Link>
        </div>
        {/* {isLoading && <Spinner />} */}
        {/* {!isLoading && ( */}
        <div style={{ height: "74vh", width: "100%", marginTop: "1.8rem" }}>
          <DataGrid
            rows={transformIngredients(ingredientsData)}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[25, 50, 100]}
            checkboxSelection
            components={{
              header: {
                cell: (props) => (
                  <th
                    className="MuiDataGrid-colCell"
                    role="columnheader"
                    tabIndex={1}
                    style={{ border: "1px solid red" }}
                    {...props}
                  >
                    <div className="MuiDataGrid-colCellTitle">
                      {props.colDef.headerName}
                    </div>
                  </th>
                ),
              },
              Toolbar: GridToolbar,
            }}
          />
        </div>
        {/* )} */}
      </Box>
    </Layout>
  );
}
