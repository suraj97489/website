import { useState } from "react";

import UserContext from "./UserContext";

import { useSelector, useDispatch } from "react-redux";

import { updateSalonProvidersfordisplay } from "../features/salonSlice";
function UserState(props) {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState(null);
  const [userBooked, setUserBooked] = useState(false);
  const [salonProvidersfordisplay, setSalonProvidersfordisplay] = useState([]);

  return (
    <UserContext.Provider
      value={{
        setCustomer,
        customer,
        userBooked,
        setUserBooked,
        salonProvidersfordisplay,
        setSalonProvidersfordisplay,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
export default UserState;
