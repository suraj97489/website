import React, { useState } from "react";
import "./AdminLogin.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/mainSlice";
import { updateCustomer } from "../features/userSlice";

function AdminLogin() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.userstate.customer);

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

        dispatch(updateUser("admin"));
        dispatch(
          updateCustomer({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );

        history.push("/dashboard");

        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage);
      });
  }
  if (customer?.email === process.env.REACT_APP_ADMIN_USERNAME) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <>
        <Helmet>
          <title>Admin Login</title>
          <meta name="description" content="enter  username and password" />
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
