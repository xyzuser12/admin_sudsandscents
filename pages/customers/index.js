import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Spinner from "@/components/Spinner";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const usersRaw = [
  {
    email: "formalejoraymartbedia@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxZHbBRbsHoVAKrZ0yj3rDiY-Ku81TCEcmst7JVh=s96-c",
    name: "raymart formalejo",
    _id: "643f5e08b6daf213779e438d",
  },
  {
    email: "formalejoraymartbedia@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxZHbBRbsHoVAKrZ0yj3rDiY-Ku81TCEcmst7JVh=s96-c",
    name: "raymart formalejo",
    _id: "643f5e08b6daf213779e438d",
  },
  {
    email: "formalejoraymartbedia@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxZHbBRbsHoVAKrZ0yj3rDiY-Ku81TCEcmst7JVh=s96-c",
    name: "raymart formalejo",
    _id: "643f5e08b6daf213779e438d",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 220 },

  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 300 },

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

const usersAddRaw = [
  {
    city: "Manila",
    country: "Philippines",
    email: "formalejoraymartbedia@gmail.com",
    name: "Raymart Formalejo",
    phoneNumber: "09452779188",
    postalCode: "1013",
    streetAddress: "1247 Yuseco St. Tondo Manila",
    userEmail: "formalejoraymartbedia@gmail.com",
    userId: "643f5e08b6daf213779e438d",
    __v: 0,
    _id: "6465dbecdc911bc36a46e01d",
  },
];
export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [tranformCustomers, setTransformCustomer] = useState([]);
  const [usersAddress, setUsersAddress] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/users").then((response) => {
      console.log(response);
      setCustomers(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/address").then((response) => {
      setUsersAddress(response.data);
    });
  }, []);

  useEffect(() => {
    setTransformCustomer(transformUsers(customers));
  }, [customers]);

  const transformUsers = (customerArr) => {
    return customerArr.map((customer) => {
      const matchingUserAdd = usersAddress.find(
        (userAdd) => userAdd.userId === customer._id
      );
      return {
        id: customer._id,
        name: matchingUserAdd ? matchingUserAdd.name : customer.name,
        email: customer.email,
      };
    });
  };
  const gotoOrder = (id) => {
    router.push("/customers/" + id);
  };
  console.log(tranformCustomers);
  // const [admins, setAdmins] = useState([]);
  // useEffect(() => {
  //   axios.get("/api/admins").then((response) => {
  //     setAdmins(response.data);
  //   });
  // }, []);
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
          <div style={{ height: "74vh", width: "100%", marginTop: "1.8rem" }}>
            <DataGrid
              rows={tranformCustomers}
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
        {/* <Link className="btn-primary" href={"/admins/new"}>
          Add new admin
        </Link>
        <table className="basic mt-2">
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
