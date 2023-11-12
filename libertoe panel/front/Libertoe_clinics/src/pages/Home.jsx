import { useContext } from "react";
import NewOrder from "../components/home/newOrder";
import Orders from "../components/home/orders";
import Profile from "../components/home/profile";
import Layout from "../components/layout/Layout";
import { UserContext } from "../context/provider";

const HomePage = () => {
  const { selectedMenu } = useContext(UserContext);

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
