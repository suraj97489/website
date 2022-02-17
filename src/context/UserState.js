import { useState } from "react";

import UserContext from "./UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/mainSlice";
import { updateSalonProvidersfordisplay } from "../features/salonSlice";
function UserState(props) {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState(null);
  const [userBooked, setUserBooked] = useState(false);
  const [salonProvidersfordisplay, setSalonProvidersfordisplay] = useState([]);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);
  const auth = getAuth();
  const allSalon = useSelector((state) => state.main.allSalon);
  const overAllCustomers = useSelector((state) => state.main.overAllCustomers);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      let thisIsprovider = allSalon?.some(
        (salon) => salon.salonUsername === user.email
      );

      if (thisIsprovider) {
        dispatch(updateUser("provider"));
        setCustomer(user);
      } else if (user.email === process.env.REACT_APP_ADMIN_USERNAME) {
        dispatch(updateUser("admin"));
        setCustomer(user);
      } else {
        dispatch(updateUser("customer"));
        setCustomer(user);
      }
    } else {
      dispatch(updateUser("customer"));
      setCustomer();
    }
  });

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
