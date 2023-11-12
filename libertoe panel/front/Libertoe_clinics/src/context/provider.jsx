import React, { createContext, useId, useState } from "react";

export const UserContext = createContext();

const MyProvider = ({ children }) => {
  const mainUrl = "http://localhost:5173"

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MyProvider;
