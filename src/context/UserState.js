import { useState, useContext } from "react";
import Maincontext from "./MainContext";
import UserContext from "./UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/mainSlice";
function UserState(props) {
  const maincontext = useContext(Maincontext);
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState(null);
  const [userBooked, setUserBooked] = useState(false);
  const [salonProvidersfordisplay, setSalonProvidersfordisplay] = useState([]);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);
  const auth = getAuth();

  function updateSalonProvidersforDisplay() {
    setSalonProvidersfordisplay(() =>
      serviceproviders?.map((provider) => {
        return { ...provider, display: "none" };
      })
    );
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      let thisIsprovider = maincontext.allSalon?.some(
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

  function updateUserBookingStatus() {
    setUserBooked(() => {
      return maincontext.overAllCustomers.some((cust) => {
        return cust.email === customer?.email;
      });
    });
  }

  return (
    <UserContext.Provider
      value={{
        setCustomer,
        customer,
        userBooked,
        setUserBooked,
        salonProvidersfordisplay,
        setSalonProvidersfordisplay,
        updateSalonProvidersforDisplay,
        updateUserBookingStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
export default UserState;
