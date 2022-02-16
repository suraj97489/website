import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNotify } from "../../features/mainSlice";
import "./Notify.css";

function Notify() {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.main.notify);
  useEffect(() => {
    function updatenotify() {
      dispatch(
        updateNotify({
          message: "",
          style: { backgroundColor: "green" },
        })
      );
    }
    setTimeout(updatenotify, 2500);
    return () => {
      clearTimeout(updatenotify);
    };
  }, [notify.message]);

  if (notify.message !== "") {
    return (
      <div className="Notify" style={notify.style}>
        {notify.message}
      </div>
    );
  } else {
    return <p></p>;
  }
}

export default Notify;
