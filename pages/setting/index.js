import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Spinner from "@/components/Spinner";
import classes from "../../styles/setting/Setting.module.css";
import { responsive } from "@cloudinary/react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Delivery options
// book my own = 0
// same day delivery = 230 no increment within manila
// next day Delivery = 180 no increment within manila
// standard Delivery = 100 no increment within manila
// provincial Delivery = 180 ++

const SettingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [idDelivery, setIdDelivery] = useState("");
  const [bookMyOwn, setBookMyOwn] = useState(0);
  const [sameDayDelivery, setSameDayDelivery] = useState(0);
  const [nextDayDelivery, setNextDayDelivery] = useState(0);
  const [standardDelivery, setStandardDelivery] = useState(0);
  const [provincialDelivery, setProvincialDelivery] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/delivery").then((response) => {
      setIdDelivery(response?.data[0]?._id);
      setSameDayDelivery(response.data[0]?.sameDayDelivery);
      setNextDayDelivery(response.data[0]?.nextDayDelivery);
      setStandardDelivery(response.data[0]?.standardDelivery);
      setProvincialDelivery(response.data[0]?.provincialDelivery);
      setIsLoading(false);
    });
  }, []);

  const saveDeliveryHandler = (e) => {
    e.preventDefault();
    if (idDelivery) {
      const data = {
        bookMyOwn,
        sameDayDelivery,
        nextDayDelivery,
        standardDelivery,
        provincialDelivery,
        _id: idDelivery,
      };

      axios.put("/api/delivery", { ...data }).then((response) => {
        console.log(response);
      });
    } else {
      const data = {
        bookMyOwn,
        sameDayDelivery,
        nextDayDelivery,
        standardDelivery,
        provincialDelivery,
      };

      axios.put("/api/delivery", { ...data }).then((response) => {
        console.log(response);
      });
    }
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
          <div>
            <Paper sx={{ padding: "1rem" }}>
              <div className={classes["shipping-fee-wrapper"]}>
                <h2>Shipping Fee</h2>
                <div>
                  <h3>Delivery options:</h3>
                  <div className={classes["delivery-option-items"]}>
                    <FormControl
                      className={classes["book-my-own"]}
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
                      <label htmlFor="book-my-own-el" className={classes.label}>
                        Book my own:
                      </label>

                      <OutlinedInput
                        id="book-my-own-el"
                        name="book-my-own-el"
                        placeholder="value"
                        type="number"
                        startAdornment={"₱ "}
                        required
                        aria-describedby="number-error-text"
                        disabled
                        value={bookMyOwn}
                      />
                    </FormControl>
                    <FormControl
                      className={classes["same-day-delivery"]}
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
                      <label
                        htmlFor="same-day-delivery-el"
                        className={classes.label}
                      >
                        Same day delivery:
                      </label>

                      <OutlinedInput
                        id="same-day-delivery-el"
                        name="same-day-delivery-el"
                        placeholder="value"
                        type="number"
                        inputProps={{ step: 1, min: 0 }}
                        startAdornment={"₱ "}
                        onChange={(ev) => setSameDayDelivery(ev.target.value)}
                        required
                        aria-describedby="number-error-text"
                        value={sameDayDelivery}
                      />
                    </FormControl>
                    <FormControl
                      className={classes["next-day-delivery"]}
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
                      <label
                        htmlFor="next-day-delivery-el"
                        className={classes.label}
                      >
                        Next day delivery:
                      </label>

                      <OutlinedInput
                        id="next-day-delivery-el"
                        name="next-day-delivery-el"
                        placeholder="value"
                        type="number"
                        inputProps={{ step: 1, min: 0 }}
                        startAdornment={"₱ "}
                        onChange={(ev) => setNextDayDelivery(ev.target.value)}
                        required
                        aria-describedby="number-error-text"
                        value={nextDayDelivery}
                      />
                    </FormControl>
                    <FormControl
                      className={classes["standard-delivery"]}
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
                      <label
                        htmlFor="standard-delivery-el"
                        className={classes.label}
                      >
                        Standard delivery:
                      </label>

                      <OutlinedInput
                        id="standard-delivery-el"
                        name="standard-delivery-el"
                        placeholder="value"
                        type="number"
                        inputProps={{ step: 1, min: 0 }}
                        startAdornment={"₱ "}
                        onChange={(ev) => setStandardDelivery(ev.target.value)}
                        required
                        aria-describedby="number-error-text"
                        value={standardDelivery}
                      />
                    </FormControl>
                    <FormControl
                      className={classes["provincila-delivery"]}
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
                      <label
                        htmlFor="provincial-delivery-el"
                        className={classes.label}
                      >
                        Provincial delivery:
                      </label>

                      <OutlinedInput
                        id="provincial-delivery-el"
                        name="provincial-delivery-el"
                        placeholder="value"
                        type="number"
                        inputProps={{ step: 1, min: 0 }}
                        startAdornment={"₱ "}
                        onChange={(ev) =>
                          setProvincialDelivery(ev.target.value)
                        }
                        required
                        aria-describedby="number-error-text"
                        value={provincialDelivery}
                      />
                    </FormControl>
                    <div
                      style={{
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
                        onClick={saveDeliveryHandler}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        )}
      </Box>
    </Layout>
  );
};
export default SettingPage;
