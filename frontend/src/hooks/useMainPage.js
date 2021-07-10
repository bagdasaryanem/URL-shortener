import { useContext, useState, useEffect } from "react";

import { BACKEND_URL } from "../constants";
import AuthContext from "../store/auth-context";

const useMainPage = () => {
  const [urls, setUrls] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [isCreatingUrl, setIsCreatingUrl] = useState(false);
  const authContext = useContext(AuthContext);

  const handleAlertClose = () => {
    setSuccessAlertOpen(false);
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}api/url/userUrls/${authContext.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Something went wrong!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setUrls(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const deleteUrl = (urlCode) => {
    fetch(`${BACKEND_URL}api/url/deleteUrl`, {
      method: "DELETE",
      body: JSON.stringify({ urlCode: urlCode, userId: authContext.userId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Something went wrong!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setUrls((curState) =>
          curState.filter((url) => url.urlCode !== data.urlCode)
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const createUrl = (event) => {
    event.preventDefault();
    fetch(`${BACKEND_URL}api/url/shorten`, {
      method: "POST",
      body: JSON.stringify({
        urlName: inputName,
        longUrl: inputUrl,
        userId: authContext.userId,
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
            throw new Error(data);
          });
        }
      })
      .then((data) => {
        setUrls((curState) => [...curState, data]);
        setIsCreatingUrl(false);
        setInputName("");
        setInputUrl("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return {
    urls,
    inputName,
    setInputName,
    inputUrl,
    setInputUrl,
    successAlertOpen,
    setSuccessAlertOpen,
    isCreatingUrl,
    setIsCreatingUrl,
    handleAlertClose,
    deleteUrl,
    createUrl,
  };
};

export default useMainPage;
