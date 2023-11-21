import { useContext, useEffect } from "react";
import NewOrder from "../components/home/newOrder";
import Orders from "../components/home/orders/index";
import Profile from "../components/home/profile";
import Layout from "../components/layout/Layout";
import { UserContext } from "../context/provider";
import { getAllOrders } from "../lib/initialProps";

const HomePage = () => {
  const { selectedMenu, setAllOrders } = useContext(UserContext);

  useEffect(()=>{
    const getOrders = async () => {
      console.log("here");
      const data = await getAllOrders()
      console.log(data);
      if(data.status === 200){
        setAllOrders(data.data)
      }
    }
    getOrders()
  },[])

  const componentStateHandler = () => {
    switch (selectedMenu) {
      case "profile":
        return <Profile />;
      case "newOrder":
        return <NewOrder />;
      case "orders":
        return <Orders />;
      default:
        return <Orders />;
    }
  };

  return (
    <>
      <Layout>
        {componentStateHandler()}
      </Layout>
    </>
  );
};

export default HomePage;
