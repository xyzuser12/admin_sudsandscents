import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { styled, Box, Button } from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import classes from "../../styles/products/AllProducts.module.css";
import Spinner from "@/components/Spinner";

const orderRaw = [
  {
    city: "Tondo, Manila",
    country: "Philippines",
    createdAt: "2023-05-16T02:20:06.900Z",
    email: "markngo65@gmail.com",
    line_items: [
      {
        categoryId: "644653bbbe70cd3d8b62bd0c",
        categoryImage:
          "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
        categoryName: "Custom Perfume",
        formula:
          "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
        ingredients: [
          "644662c5be70cd3d8b62bd73",
          "6453614eef19e3b71076cf7b",
          "645361c7ef19e3b71076cf9f",
        ],
        numberOfLiter: 2,
        productId:
          "ad1c55782b9f5383d1220df425de4069edaa089ac7d582cc6ecb6b43b2d2ecca",
        totalEstimatedCost: 245,
      },
      {
        categoryId: "644653bbbe70cd3d8b62bd0c",
        categoryImage:
          "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
        categoryName: "Custom Perfume",
        formula:
          "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
        ingredients: [
          "644662c5be70cd3d8b62bd73",
          "6453614eef19e3b71076cf7b",
          "645361c7ef19e3b71076cf9f",
        ],
        numberOfLiter: 2,
        productId:
          "ad1c55782b9f5383d1220df425de4069edaa089ac7d582cc6ecb6b43b2d2ecca",
        totalEstimatedCost: 245,
      },
    ],
    name: "Mark Angelo Ponce Ngo",
    status: "Processing",
    paymentMethod: "COD",
    phoneNumber: "09760221701",
    postalCode: "1412",
    streetAddress: "1636 F. Varona St.",
    updatedAt: "2023-05-16T02:20:06.900Z",

    _id: "6462e856b00c52c0390ef2a4",
  },
  {
    city: "Tondo, Manila",
    country: "Philippines",
    createdAt: "2023-05-16T02:20:06.900Z",
    email: "markngo65@gmail.com",
    line_items: [
      {
        categoryId: "644653bbbe70cd3d8b62bd0c",
        categoryImage:
          "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
        categoryName: "Custom Perfume",
        formula:
          "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
        ingredients: [
          "644662c5be70cd3d8b62bd73",
          "6453614eef19e3b71076cf7b",
          "645361c7ef19e3b71076cf9f",
        ],
        numberOfLiter: 2,
        productId:
          "ad1c55782b9f5383d1220df425de4069edaa089ac7d582cc6ecb6b43b2d2ecca",
        totalEstimatedCost: 245,
      },
    ],
    name: "Mark Angelo Ponce Ngo",
    status: "Processing",
    paymentMethod: "COD",
    phoneNumber: "09760221701",
    postalCode: "1412",
    streetAddress: "1636 F. Varona St.",
    updatedAt: "2023-05-16T02:20:06.900Z",

    _id: "6462e856b00c52c0390ef2a4",
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const columns = [
  { field: "id", headerName: "ID", width: 170 },

  { field: "date", headerName: "Date", width: 190 },
  { field: "recipient", headerName: "Recipient", width: 200 },
  { field: "price", headerName: "Price", width: 170 },
  { field: "payment", headerName: "Payment", width: 170 },
  {
    field: "status",
    headerName: "Status",
    width: 170,
    renderCell: (params) => (
      <div
        style={{
          backgroundColor:
            params.value === "Completed"
              ? "#c6e1c6"
              : params.value === "Processing"
              ? "#FFF4E5"
              : params.value === "Cancelled"
              ? "#f8f8f8"
              : params.value === "On hold"
              ? "#c8d7e1"
              : "inherit",
          color:
            params.value === "Completed"
              ? "#5b841b"
              : params.value === "Processing"
              ? "#AD926B"
              : params.value === "Cancelled"
              ? "#999"
              : params.value === "On hold"
              ? "#2e4453"
              : "inherit",
          fontSize: "13px",
          padding: "0 12px",
          borderRadius: "4px",
          lineHeight: "2.5em",
          display: "inline-flex",
          borderBottom: "1px solid rgba(0,0,0,.05)",
          margin: "-0.25em 0",
          cursor: "inherit!important",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {params.value}
      </div>
    ),
  },

  // {
  //   field: "actions",
  //   headerName: "Action buttons",
  //   width: 200,
  //   sortable: false,
  //   disableColumnMenu: true,
  //   renderCell: (params) => {
  //     return (
  //       <div className={classes["action-buttons-wrapper"]}>
  //         <Link
  //           className={`btn-default ${classes.edit}`}
  //           href={"/products/edit/" + params.id}
  //           style={{ zIndex: "999" }}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="w-4 h-4"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
  //             />
  //           </svg>
  //           <span>Edit</span>
  //         </Link>
  //         <Link
  //           className={`btn-red ${classes.delete}`}
  //           href={"/products/delete/" + params.id}
  //           style={{ zIndex: "999" }}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="w-4 h-4"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  //             />
  //           </svg>
  //           <span>Delete</span>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((response) => {
      console.log(response);
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);
  function gotoOrder(id) {
    router.push("/orders/" + id);
  }
  function transformOrders(orderRaw) {
    const result = [];

    for (const order of orderRaw) {
      let accumulatedPrice = 0;
      const date = new Date(order.createdAt);
      const options = {
        timeZone: "Asia/Manila",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      const dateString = date.toLocaleDateString("en-PH", options);
      const timeString = date.toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
      });
      const formattedDate = `${dateString} / ${timeString.toLowerCase()}`;
      for (const item of order.line_items) {
        accumulatedPrice += item.numberOfLiter * item.totalEstimatedCost;
      }

      result.push({
        id: order._id,
        date: formattedDate,
        recipient: order.name,
        price: "₱" + accumulatedPrice.toFixed(2),
        payment: order.paymentMethod,
        status: order.status,
      });
    }

    return result;
  }
  console.log(orderRaw);
  console.log(transformOrders(orders));
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
        <h1>Orders</h1>
        {isLoading && <Spinner />}
        {!isLoading && (
          <div style={{ height: "74vh", width: "100%", marginTop: "1.8rem" }}>
            <DataGrid
              rows={transformOrders(orders)}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onCellClick={(params, event) => {
                console.log(params);
                console.log(event);
                if (params.field !== "__check__") {
                  event.stopPropagation();
                  gotoOrder(params.id);
                }
              }}
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
        )}
      </Box>
    </Layout>
  );
}
