import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "./Login";
import axios from "axios";

const LoginProvider = ({ children }) => {
  const [data, setData] = useState();
  const [showLogin, setShowLogin] = useState(false);

  const url = "https://api.tutedude.com/assignment/mentor/login";

  const onLogin = (email, password) => {
    axios
      .post(
        url,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (data.success === "true" || data.success === true) {
          setData(data.token);
          setShowLogin(false);
          Cookies.set("mentor_token", data.token);
        } else {
          window.alert("Invalid Email or Password");
        }
      });
    // fetch(url, {
    //   method: "POST",
    //   mode: "no-cors",
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);

    //     if (data.success === "true" || data.success === true) {
    //       setData(data.token);
    //       setShowLogin(false);
    //       Cookies.set("mentor_token", data.token);
    //     } else {
    //       window.alert("Invalid Email or Password");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     window.alert("Something went wrong");
    //   });
  };

  useEffect(() => {
    // const email = Cookies.get("user_email");
    // const password = Cookies.get("user_pass");
    const token = Cookies.get("mentor_token");
    if (!token) {
      setShowLogin(true);
      return;
    }

    // fetch(url, {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);

    //     if (data.success === "true" || data.success === true) {
    //       console.log(data);
    //       Cookies.set("token", data.token);
    //       setData(data.dashboard);
    //       setShowLogin(false);
    //     } else {
    //       setShowLogin(true);
    //     }
    //   })
    //   .catch(() => {
    //     setShowLogin(true);
    //   });
  }, []);

  // if (showLogin && !data) return <Login onSubmit={onLogin} />;
  if (showLogin) return <Login onSubmit={onLogin} />;
  // if (!data) return "Loading...";
  return <>{children}</>;
};

export default LoginProvider;
