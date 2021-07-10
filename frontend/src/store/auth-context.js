import React, { useState } from "react";

const AuthContext = React.createContext({
  userId: "",
  isLoggedIn: false,
  login: (userId) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const isLoggedIn = !!userId;

  const loginHandler = (userId) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const logoutHandler = () => {
    setUserId(null);
    localStorage.removeItem("userId");
  };

  const contextValue = {
    userId: userId,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
