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
import Spinner from "@/components/Spinner";

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

export default function OrderSinglePage() {
  const router = useRouter();
  const _id = router?.query.id;
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);

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
        setIsLoading(false);
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
        )}
      </Box>
    </Layout>
  );
}
