import React, { useContext, useState } from "react";
import "./AdminLogin.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Maincontext from "./../context/MainContext";
import { Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";
import { Helmet } from "react-helmet-async";

function AdminLogin() {
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();
  const auth = getAuth();
  const history = useHistory();

  function adminLoginValue(e) {
    let name = e.target.name;
    let value = e.target.value;
    setAdmin({ ...admin, [name]: value });
  }
  function checkAdmin(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, admin.email, admin.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        maincontext.setUser("admin");
        usercontext.setCustomer(user);
        history.push("/dashboard");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage);
      });
  }
  if (usercontext.customer?.email === process.env.REACT_APP_ADMIN_USERNAME) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <>
        <Helmet>
          <title>dashboard</title>
          <meta name="description" content="enter your username and password" />
          <link rel="canonical" href="/8484" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div onSubmit={checkAdmin} className="Admin__Login">
          <form>
            <label>email</label>
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={adminLoginValue}
            ></input>
            <label>password</label>
            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={adminLoginValue}
            ></input>
            <button>submit</button>
          </form>
          <p style={{ color: "red", fontSize: "2rem" }}>{message}</p>
        </div>
      </>
    );
  }
}

export default AdminLogin;
