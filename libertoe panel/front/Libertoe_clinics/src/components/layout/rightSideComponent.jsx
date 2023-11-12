import { useContext } from "react";
import profileImg from "../../assets/img/profile.jpg";
import { UserContext } from "../../context/provider";

const RightSideComponent = () => {
  const { selectedMenu, setSelectedMenu } = useContext(UserContext);

  const selectedStyle = {
    backgroundColor: "white",
    color: "#017067",
    // padding: "10px 20px",
    borderRadius: "20px",
  };

  return (
    <>
      <div className=" w-full flex flex-col gap-16 ">
        <div className=" w-full flex flex-col items-center gap-3 ">
          <img src={profileImg} className=" rounded-full w-1/2 " />
          <h1 className=" text-xl ">کلینیک عسمران</h1>
        </div>
        <div className="w-full flex flex-col items-center gap-7 ">
          <p
            className="px-5 py-[10px] cursor-pointer duration-200 ease-linear text-xl "
            style={selectedMenu === "profile" ? selectedStyle : {}}
            onClick={() => setSelectedMenu("profile")}
          >
            پروفایل
          </p>
          <p
            className="px-5 py-[10px] cursor-pointer duration-200 ease-linear text-xl "
            style={selectedMenu === "newOrder" ? selectedStyle : {}}
            onClick={() => setSelectedMenu("newOrder")}
          >
            ثبت سفارش
          </p>
          <p
            className="px-5 py-[10px] cursor-pointer duration-200 ease-linear text-xl "
            style={selectedMenu === "orders" ? selectedStyle : {}}
            onClick={() => setSelectedMenu("orders")}
          >
            سفارشات
          </p>
        </div>
      </div>
    </>
  );
};

export default RightSideComponent;
