import React, { useContext, useEffect } from "react";
import Maincontext from "../../context/MainContext";
import "./Notify.css";

function Notify() {
  const maincontext = useContext(Maincontext);
  useEffect(() => {
    function updatenotify() {
      maincontext.setNotify({
        message: "",
        style: { backgroundColor: "green" },
      });
    }
    setTimeout(updatenotify, 2500);
    return () => {
      clearTimeout(updatenotify);
    };
  }, [maincontext.notify.message]);

  if (maincontext.notify.message !== "") {
    return (
      <div className="Notify" style={maincontext.notify.style}>
        {maincontext.notify.message}
      </div>
    );
  } else {
    return <p></p>;
  }
}

export default Notify;
