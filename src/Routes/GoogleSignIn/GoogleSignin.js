import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Maincontext from "../../context/MainContext";
import UserContext from "../../context/UserContext";
import "./GoogleSignin.css";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function GoogleSignin() {
  let history = useHistory();
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);
  const [clicked, setclicked] = useState(false);

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
        maincontext.setGrahak(customerdata);
        localStorage.setItem("grahak", JSON.stringify(customerdata));
        usercontext.setCustomer(user);

        maincontext.setUser("customer");

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
  } else if (maincontext.user === "customer" && localdata) {
    return <Redirect to="/salonpage" />;
  } else {
    return (
      <>
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
