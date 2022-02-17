import React from "react";

import ProviderState from "./context/ProviderState";
import "./css/index.css";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <>
      <ProviderState>
        <AllRoutes />
      </ProviderState>
    </>
  );
}

export default App;
