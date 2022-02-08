import { useState, useContext } from "react";
import Maincontext from "./MainContext";
import UserContext from "./UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function UserState(props) {
  const maincontext = useContext(Maincontext);

  const [customer, setCustomer] = useState(null);
  const [userBooked, setUserBooked] = useState(false);
  const [salonProvidersfordisplay, setSalonProvidersfordisplay] = useState([]);

  const auth = getAuth();

  function updateSalonProvidersforDisplay() {
    setSalonProvidersfordisplay(() =>
      maincontext.serviceproviders?.map((provider) => {
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
        maincontext.setUser("provider");
        setCustomer(user);
      } else if (user.email === process.env.REACT_APP_ADMIN_USERNAME) {
        maincontext.setUser("admin");
        setCustomer(user);
      } else {
        maincontext.setUser("customer");
        setCustomer(user);
      }
    } else {
      maincontext.setUser();
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
