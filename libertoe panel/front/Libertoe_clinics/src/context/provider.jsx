import React, { createContext, useId, useState } from "react";

export const UserContext = createContext();

const MyProvider = ({ children }) => {
  const mainUrl = "http://localhost:5173"

  const [allOrders, setAllOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(0)
  const [allProducts, setAllProducts] = useState([])
  const [productsForOrders, setProductsForOrders] = useState([])

  // uses in all pages
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})

  // home page => menu
  const [selectedMenu, setSelectedMenu] = useState("orders")

  return (
    <UserContext.Provider
      value={{
        mainUrl,
        userData, setUserData,
        isLoggedIn, setIsLoggedIn,
        selectedMenu, setSelectedMenu,
        allProducts, setAllProducts,
        allOrders, setAllOrders,
        selectedOrder, setSelectedOrder,
        productsForOrders, setProductsForOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MyProvider;
