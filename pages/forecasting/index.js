import Layout from "@/components/Layout";
import { styled, Box } from "@mui/material";
import { Chart } from "react-google-charts";
import { prisma } from "../../lib/prismaClient";

export const data = [
  ["Date", "Number of Orders"],
  ["2004", 1],
  ["2005", 2],
  ["2006", 1],
  ["2007", 3],
];

export const options = {
  title: "SUDS & SCENTS FORECASTING",
  curveType: "function",
  legend: { position: "bottom" },
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const GeolocationPage = (props) => {
  const { timeSeriesData } = props
  const data_ = [["Date", "Number of Orders"]];

  // Then, convert the date and number pairs
  timeSeriesData.forEach(([dateString, number]) => {
    const dateObject = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObject);
    data_.push([formattedDate, number]);
  });

  console.log(data_);

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
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data_}
          options={options}
        />
      </Box>
    </Layout>
  );
};

export default GeolocationPage;


export const getServerSideProps = async () => {
  const orders = await prisma.orders.findMany({
    orderBy: {
      createdAt: 'asc'
    }
  })
  const timeSeriesData = orders.map((order) => [
    order.createdAt.toISOString(),
    parseFloat("1.0"),
  ]);

  return { props: { timeSeriesData } }

}
