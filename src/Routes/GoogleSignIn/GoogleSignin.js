import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

import "./GoogleSignin.css";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { updateGrahak, updateUser } from "../../features/mainSlice";
import { updateCustomer } from "../../features/userSlice";

function GoogleSignin() {
  let history = useHistory();
  const dispatch = useDispatch();

  const [clicked, setclicked] = useState(false);
  const user = useSelector((state) => state.main.user);
  function confirmlogin(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    setclicked(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        setclicked(false);

        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        let usernamearray = user.displayName.split(" ");
        let customerdata = {
          fname: usernamearray[0],
          lname: usernamearray[1],
          mobile: "",
          service: [],
          email: user.email,
        };
        dispatch(updateGrahak(customerdata));

        localStorage.setItem("grahak", JSON.stringify(customerdata));
        dispatch(
          updateCustomer({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );

        dispatch(updateUser("customer"));

        history.push("/salonpage");

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        setclicked(false);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  let localdata = localStorage.getItem("salon");

  if (!localdata) {
    return <Redirect to="/" />;
  } else if (user === "customer" && localdata) {
    return <Redirect to="/salonpage" />;
  } else {
    return (
      <>
        <Helmet>
          <title>Sign In with google</title>
          <meta name="description" content="Sign in with your google acount." />
          <link rel="canonical" href="/sign-in-with-google" />
        </Helmet>
        <div className="buttoncontainer">
          {clicked ? (
            <CircularProgress />
          ) : (
            <button className="signin" onClick={confirmlogin}>
              sign in with google
            </button>
          )}
        </div>
      </>
    );
  }
}

export default GoogleSignin;
