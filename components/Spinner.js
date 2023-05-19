import { Oval } from "react-loader-spinner";
export default function Spinner() {
  return (
    <Oval
      height={"80vh"}
      width={90}
      color="#DE89A1"
      wrapperStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#FBF3FC"
      strokeWidth={3}
      strokeWidthSecondary={3}
    />
  );
}
