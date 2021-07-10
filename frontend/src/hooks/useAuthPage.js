import { useContext, useState } from "react";

import { BACKEND_URL } from "../constants";
import AuthContext from "../store/auth-context";

const useAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const authenticate = (event) => {
    event.preventDefault();
    fetch(`${BACKEND_URL}api/user/${isLogin ? "auth" : "register"}`, {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authContext.login(data.uid);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return {
    authenticate,
    isLogin,
    setIsLogin,
    userName,
    setUserName,
    password,
    setPassword,
  };
};

export default useAuthPage;
