import RightSideComponent from "./rightSideComponent";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row-reverse h-[100vh] font-[vazir] ">
      <div className=" w-[25%] max-w-[250px] p-5 relative box-content bg-[#017067] text-white ">
        <RightSideComponent />
      </div>
      <div className=" w-full h-full ">
        <div className=" h-[8%] w-full bg-[#017067] flex flex-col justify-end " >
            <div className=" h-[30%] bg-white rounded-tr-xl " ></div>
        </div>
        <div className=" h-[92%] w-full  " >{children}</div>
      </div>
    </div>
  );
};

export default Layout;
