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

import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "../../styles/orders/OrdersSinglePage.module.css";
import Spinner from "@/components/Spinner";

const orderRaw = [
  {
    categoryId: "644653bbbe70cd3d8b62bd0c",
    categoryImage:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula:
      "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
    ingredients: [
      "644662c5be70cd3d8b62bd73",
      "6446630abe70cd3d8b62bd7f",
      "64536178ef19e3b71076cf87",
      "645361e6ef19e3b71076cfab",
    ],

    numberOfLiter: 1,
    productId:
      "9d3904c6047479b0e3e24f9dda1e1bcb754c14b6e33f3f0d45dcfc46b5b57347",
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
      "6446630abe70cd3d8b62bd7f",
      "64536178ef19e3b71076cf87",
      "645361e6ef19e3b71076cfab",
    ],

    numberOfLiter: 1,
    productId:
      "9d3904c6047479b0e3e24f9dda1e1bcb754c14b6e33f3f0d45dcfc46b5b57347",
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
      "6446630abe70cd3d8b62bd7f",
      "64536178ef19e3b71076cf87",
      "645361e6ef19e3b71076cfab",
    ],

    numberOfLiter: 1,
    productId:
      "9d3904c6047479b0e3e24f9dda1e1bcb754c14b6e33f3f0d45dcfc46b5b57347",
    totalEstimatedCost: 245,
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
  { field: "status", headerName: "Status", width: 170 },

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
const prodIds = [
  "644662c5be70cd3d8b62bd73",
  "6446630abe70cd3d8b62bd7f",
  "64536178ef19e3b71076cf87",
  "645361e6ef19e3b71076cfab",
];

const products = [
  {
    category: "64466196be70cd3d8b62bd4b",
    composition: "2nd Scents",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682331136/jojoba_bpyuui.png",
    price: 30,
    quantity: 20,
    title: "Jojoba",
    updatedAt: "2023-04-24T12:30:19.229Z",
    __v: 0,
    _id: "64465605be70cd3d8b62bd1d",
  },
  {
    category: "64466196be70cd3d8b62bd4b",
    composition: "2nd Scents",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682331136/jojoba_bpyuui.png",
    price: 30,
    quantity: 20,
    title: "Jojoba",
    updatedAt: "2023-04-24T12:30:19.229Z",
    __v: 0,
    _id: "64465605be70cd3d8b62bd1d",
  },
];

export default function OrderSinglePage() {
  const router = useRouter();
  const _id = router?.query.id;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);
  const [status, setStatus] = useState("");
  const [goToAllOrders, setGoToAllOrders] = useState(false);
  const date = new Date(orders.createdAt);
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
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/orders?id=" + _id)
      .then((response) => {
        setOrders(response.data);
        setStatus(response.data.status);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);

  useEffect(() => {
    const productIds = [
      ...new Set(
        orderRaw.flatMap((item) =>
          item.ingredients.map((ingredientId) => ingredientId)
        )
      ),
    ];
    setProductId(productIds);
    axios.get("/api/products").then((response) => {
      setProductsArr(response.data);
    });
  }, []);

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const saveHandler = async (e) => {
    e.preventDefault();

    const data = {
      status,
    };
    if (_id) {
      console.log(data);
      await axios.put("/api/orders", { ...data, _id });
    }
    setGoToAllOrders(true);
  };

  if (goToAllOrders) {
    router.push("/orders");
  }

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
          <div className={classes["container"]}>
            <Paper
              className={classes["order-wrapper"]}
              sx={{ padding: "1rem", display: "flex", flexDirection: "column" }}
            >
              <h2>Order #{orders._id} details</h2>
              <div>
                <div className={classes["order-general"]}>
                  <h3>General</h3>
                  <div className={classes["date-wrapper"]}>
                    <p className={classes["date-title"]}>Date created:</p>
                    <p>{formattedDate}</p>
                  </div>
                  <div>
                    <p className={classes["status-title"]}>Status:</p>
                    {status && (
                      <FormControl
                        // error={isErrorPaymentMethod}
                        sx={{
                          m: 1,
                          width: "100%",
                          margin: "0",
                          "& div div": { padding: "0" },
                          maxWidth: "500px",
                        }}
                      >
                        <Select
                          disableScrollLock
                          value={status}
                          onChange={statusHandler}
                          // defaultValue={status}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          required
                          sx={{
                            padding: ".4rem",
                            fontSize: "15px",
                            "& div": {
                              paddingRight: "0 !important",
                            },
                          }}
                        >
                          <MenuItem value={"Completed"}>Completed</MenuItem>
                          <MenuItem value={"Pending payment"}>
                            Pending payment
                          </MenuItem>
                          <MenuItem value={"Processing"}>Processing</MenuItem>
                          <MenuItem value={"On hold"}>On hold</MenuItem>
                          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                          <MenuItem value={"Refunded"}>Refunded</MenuItem>
                        </Select>

                        {/* {isErrorPaymentMethod && errorPaymentMethod && (
                  <FormHelperText
                    id="country-error-text"
                    sx={{ marginLeft: "4px" }}
                  >
                    {errorPaymentMethod}
                  </FormHelperText>
                )} */}
                      </FormControl>
                    )}
                  </div>
                  <div>
                    <p className={classes["customer-title"]}>Customer name:</p>
                    <p>{orders.name}</p>
                  </div>
                  <div>
                    <p className={classes["email-title"]}>Email:</p>
                    <p className={classes["email"]}>{orders.email}</p>
                  </div>
                  <div>
                    <p className={classes["phone-title"]}>Phone:</p>
                    <p>{orders.phoneNumber}</p>
                  </div>
                </div>
                <div className={classes["order-shipping"]}>
                  <h3>Shipping</h3>
                  <div>
                    <p className={classes["address-title"]}>Address:</p>
                    <p>{orders.streetAddress}</p>
                  </div>
                  <div>
                    <p className={classes["payment-title"]}>Payment method:</p>
                    <p>{orders.paymentMethod}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#DE89A1",
                  borderRadius: "4px",
                  marginTop: "2rem",
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
                  onClick={saveHandler}
                >
                  Save
                </Button>
              </div>
            </Paper>
            {/* {orders &&
            orders.line_items &&
            orders.line_items.length > 0 &&
            orders?.line_items?.map((product) => console.log(product))} */}
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F8F8F8" }}>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Ingredients</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders &&
                    orders.line_items &&
                    orders.line_items.length > 0 &&
                    orders?.line_items?.map((product) => {
                      // console.log(product);
                      return (
                        <TableRow
                          key={product.productId}
                          sx={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <TableCell
                            sx={{ display: "flex", borderBottom: "none" }}
                          >
                            <Image
                              src={product.categoryImage}
                              alt="product image"
                              height={60}
                              width={60}
                            />
                            {`${product.categoryName} ${product.numberOfLiter}L`}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ borderBottom: "none" }}
                          >
                            {product.ingredients.map((ingredient) => {
                              const ingreData = productsArr.find(
                                (p) => p._id === ingredient
                              );
                              // console.log(ingreData);
                              if (ingreData) {
                                return (
                                  <p key={ingreData._id}>
                                    {`${ingreData.title} ${ingreData.composition}`}{" "}
                                  </p>
                                );
                              }
                            })}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ borderBottom: "none" }}
                          >
                            {product.ingredients.map((ingredient) => {
                              const ingreData = productsArr.find(
                                (p) => p._id === ingredient
                              );
                              if (ingreData) {
                                return (
                                  <p
                                    key={ingreData._id}
                                  >{`₱${ingreData.price.toFixed(2)}`}</p>
                                );
                              }
                            })}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ borderBottom: "none" }}
                          >
                            {`₱${(
                              product.numberOfLiter * product.totalEstimatedCost
                            ).toFixed(2)}`}
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  <TableRow>
                    <TableCell colSpan={2} sx={{ borderBottom: "none" }} />
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">{1235}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={2} />

                    <TableCell>
                      <p>Total</p>
                    </TableCell>
                    <TableCell align="right">{1235}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={3}>
                          Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Items</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Sum</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody></TableBody>
          {orders &&
            orders.line_items &&
            orders.line_items.length > 0 &&
            orders?.line_items?.map((product) => {
              console.log(product);
              return (
                
                      
                        <TableRow key={row.desc}>
                          <TableCell>{row.desc}</TableCell>
                          <TableCell align="right">{row.qty}</TableCell>
                          <TableCell align="right">{row.unit}</TableCell>
                          <TableCell align="right">
                            {ccyFormat(row.price)}
                          </TableCell>
                        </TableRow>

              );
              // <p>{product.categoryName}</p>;
            })}
            
            <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">
                          {ccyFormat(invoiceSubtotal)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                          0
                        )} %`}</TableCell>
                        <TableCell align="right">
                          {ccyFormat(invoiceTaxes)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                          {ccyFormat(invoiceTotal)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer> */}
          </div>
        )}
      </Box>
    </Layout>
  );
}
