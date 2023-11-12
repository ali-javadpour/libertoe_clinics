import React, { createContext, useId, useState } from "react";

export const UserContext = createContext();

const MyProvider = ({ children }) => {
  const mainUrl = "http://localhost:5173"

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})

  return (
    <UserContext.Provider
      value={{
        mainUrl,
        userData, setUserData,
        isLoggedIn, setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MyProvider;
