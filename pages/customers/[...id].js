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

import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@mui/icons-material/Edit";

import classes from "../../styles/customers/Customers.module.css";

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
  const [userData, setUserData] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    if (_id) {
      axios.get("/api/users?id=" + _id.toString()).then((response) => {
        setUserData(response.data);
        setProfilePhoto(response.data.image);
        if (!name && !email) {
          setName(response.data.name);
          setEmail(response.data.email);
        }
      });
    }
  }, [_id, userAddress]);

  useEffect(() => {
    if (_id) {
      axios.get("/api/address?userId=" + _id.toString()).then((response) => {
        if (response.data) {
          setUserAddress(response.data);
          setName(response.data.name);
          setPhoneNumber(response.data.phoneNumber);
          setEmail(response.data.email);
          setCity(response.data.city);
          setPostalCode(response.data.postalCode);
          setStreetAddress(response.data.streetAddress);
          setCountry(response.data.country);
        }
      });
    }
  }, [_id]);

  const goBack = () => {
    router.push("/customers");
  };
  const saveCustomerHandler = (e) => {
    e.preventDefault();
    const data1 = {
      name,
      email,
    };
    const data2 = {
      name,
      userId: _id[0],
      phoneNumber,
      email,
      city,
      streetAddress,
      postalCode,
      country,
    };

    axios.put("/api/users", { ...data1, _id });

    if (userAddress) {
      axios.put("/api/address", data2).catch((error) => {
        console.error(`💥💥${error}`);
      });
    }

    goBack();
  };

  const deleteCustomerHandler = (e) => {
    e.preventDefault();

    axios.delete("/api/users?id=" + _id.toString());

    if (userAddress) {
      axios.delete("/api/address?userId=" + _id.toString());
    }

    goBack();
  };

  console.log(userData);
  console.log(userAddress);
  // const [orders, setOrders] = useState([]);
  // const [productsArr, setProductsArr] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [productId, setProductId] = useState([]);
  // const [status, setStatus] = useState("");
  // const [goToAllOrders, setGoToAllOrders] = useState(false);
  // const date = new Date(orders.createdAt);
  // const options = {
  //   timeZone: "Asia/Manila",
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // };
  // const dateString = date.toLocaleDateString("en-PH", options);
  // const timeString = date.toLocaleTimeString("en-US", {
  //   timeZone: "Asia/Manila",
  //   hour: "numeric",
  //   minute: "2-digit",
  // });
  // const formattedDate = `${dateString} / ${timeString.toLowerCase()}`;
  // useEffect(() => {
  //   axios
  //     .get("/api/orders?id=" + _id)
  //     .then((response) => {
  //       console.log(response);
  //       setOrders(response.data);
  //       console.log(orders);
  //       setStatus(response.data.status);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [_id]);

  // useEffect(() => {
  //   const productIds = [
  //     ...new Set(
  //       orderRaw.flatMap((item) =>
  //         item.ingredients.map((ingredientId) => ingredientId)
  //       )
  //     ),
  //   ];
  //   setProductId(productIds);
  //   axios.get("/api/products").then((response) => {
  //     setProductsArr(response.data);
  //   });
  // }, []);

  // function getProductIds(orderRaw) {
  //   const productIds = [];

  //   orderRaw.forEach((order) => {
  //     const lineItems = order.line_items || [];
  //     lineItems.forEach((item) => {
  //       productIds.push({ id: item.productId });
  //     });
  //   });

  //   return productIds;
  // }

  // const statusHandler = (e) => {
  //   setStatus(e.target.value);
  // };

  // const saveHandler = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     status,
  //   };
  //   if (_id) {
  //     console.log(data);
  //     await axios.put("/api/orders", { ...data, _id });
  //   }
  //   setGoToAllOrders(true);
  // };

  // if (goToAllOrders) {
  //   router.push("/orders");
  // }

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
        <div className={classes.container}>
          {alertVisible && (
            <Alert
              severity={alertSeverity}
              variant="filled"
              sx={{
                position: "fixed",
                top: "1rem",
                left: "50%",
                transform: "translateX(-50%) !important",
                zIndex: "9999999",
              }}
            >
              {alertSeverity === "success"
                ? "Successfully saved!"
                : "Something went wrong, please try again."}
            </Alert>
          )}
          <div className={classes["inner-container"]}>
            <h2 className={classes["account-title"]}>
              Customer #{_id} details
            </h2>
            <div className={classes["account-container"]}>
              <div className={classes["information-wrapper"]}>
                <h3>Information</h3>
                <FormControl
                  className={classes["name"]}
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
                  <label htmlFor="name" className={classes.label}>
                    Name
                  </label>
                  <OutlinedInput
                    id="name"
                    name="name"
                    type="text"
                    onChange={(ev) => setName(ev.target.value)}
                    required
                    aria-describedby="name-error-text"
                    value={name}
                  />
                </FormControl>

                <FormControl
                  className={classes["phone-number"]}
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
                  <label htmlFor="phoneNumber" className={classes.label}>
                    Phone number
                  </label>

                  <OutlinedInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    onChange={(ev) => setPhoneNumber(ev.target.value)}
                    required
                    aria-describedby="number-error-text"
                    value={phoneNumber}
                  />
                </FormControl>
                <FormControl
                  className={classes["email"]}
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
                  <label htmlFor="email" className={classes.label}>
                    Email
                  </label>

                  <OutlinedInput
                    id="email"
                    name="email"
                    type="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                    required
                    aria-describedby="email-error-text"
                    value={email}
                  />
                </FormControl>
                <div className={classes.country}>
                  <FormControl
                    className={classes["city"]}
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
                    <label htmlFor="city" className={classes.label}>
                      City
                    </label>

                    <OutlinedInput
                      id="city"
                      name="city"
                      type="text"
                      onChange={(ev) => setCity(ev.target.value)}
                      required
                      aria-describedby="city-error-text"
                      value={city}
                    />
                  </FormControl>
                  <FormControl
                    className={classes["postal-code"]}
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
                    <label htmlFor="postalCode" className={classes.label}>
                      Postal code
                    </label>

                    <OutlinedInput
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                      required
                      aria-describedby="postal-error-text"
                      value={postalCode}
                    />
                  </FormControl>
                </div>
                <FormControl
                  size="small"
                  className={classes["street-address"]}
                  sx={{
                    m: 1,
                    width: "100%",
                    margin: "0",
                    "& div": {
                      fontSize: "14px",
                    },
                  }}
                >
                  <label htmlFor="streetAddress" className={classes.label}>
                    Street address
                  </label>

                  <OutlinedInput
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                    required
                    aria-describedby="street-error-text"
                    value={streetAddress}
                  />
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
                  <label htmlFor="country" className={classes.label}>
                    Country
                  </label>

                  <OutlinedInput
                    id="country"
                    name="country"
                    type="text"
                    onChange={(ev) => setCountry(ev.target.value)}
                    required
                    aria-describedby="country-error-text"
                    value={country}
                  />
                </FormControl>

                {/* <Button
                  variant="contained"
                  className={classes["buy-now__button"]}
                  sx={{
                    width: "100%",
                    alignSelf: "center",
                    padding: "0.8em 2em",
                    borderRadius: "8px",
                    textTransform: "uppercase",
                    fontSize: "14px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    backgroundColor: "#de89a1",
                    color: "#fff",
                    outline: "none",
                    border: "none",
                  }}
                  onClick={saveAccountDetails}
                >
                  Save
                </Button> */}
                {_id && (
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginTop: "2rem",
                      alignSelf: "end",
                    }}
                  >
                    <div
                      style={{
                        // backgroundColor: "#DE89A1",
                        borderRadius: "4px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          color: "primary",
                          fontSize: "13px",
                          textTransform: "none",
                          zIndex: "999",
                        }}
                        onClick={deleteCustomerHandler}
                      >
                        Delete
                      </Button>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#DE89A1",
                        borderRadius: "4px",
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
                        onClick={saveCustomerHandler}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className={classes["profile-pic-wrapper"]}>
                <h3>Profile photo</h3>
                <div className={classes["image-wrapper"]}>
                  <Image
                    src={`${
                      profilePhoto
                        ? profilePhoto
                        : "https://res.cloudinary.com/dkppw65bv/image/upload/c_scale,h_236/v1684159321/profiletempo_kwjl6v.jpg"
                    }`}
                    alt={`profile photo of ${name}`}
                    width={100}
                    height={100}
                    className={classes["profile-photo"]}
                  />
                  {/* <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      "& svg": { fill: "#fff", zIndex: "1" },
                      "& span": {
                        backgroundColor: "#DE89A1",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={classes["container"]}>
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

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
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
                        <TableCell align="right" sx={{ borderBottom: "none" }}>
                          {product.ingredients.map((ingredient) => {
                            const ingreData = productsArr.find(
                              (p) => p._id === ingredient
                            );
                            if (ingreData) {
                              return (
                                <p key={ingreData._id}>
                                  {`${ingreData.title} ${ingreData.composition}`}{" "}
                                </p>
                              );
                            }
                          })}
                        </TableCell>
                        <TableCell align="right" sx={{ borderBottom: "none" }}>
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
                        <TableCell align="right" sx={{ borderBottom: "none" }}>
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

         
        </div> */}
      </Box>
    </Layout>
  );
}
