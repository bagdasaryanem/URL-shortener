import React from "react";
import { Button, TextField } from "@material-ui/core";

import "./styles.css";
import useAuthPage from "../../hooks/useAuthPage";

const AuthPage = () => {
  const {
    authenticate,
    isLogin,
    setIsLogin,
    userName,
    setUserName,
    password,
    setPassword,
  } = useAuthPage();

  return (
    <div className="SignIn_SignUp">
      <div className="sign_nav">
        <button
          className={`site ${isLogin ? "activeSite" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Sign In
        </button>
        <button
          className={`site ${isLogin ? "" : "activeSite"}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
      <form style={{ minHeight: "200px" }} onSubmit={authenticate}>
        <TextField
          type="text"
          label="UserName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />

        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button variant="contained" color="primary" type="submit">
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
