import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { ManagerSite } from "./Pages/ManagerSite";
import { StaffSite } from "./Pages/StaffSite";

const App: React.FC = () => {

  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/staff"
            element={<StaffSite></StaffSite>}
          ></Route>
          <Route path="/manager" element={<ManagerSite />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

// <LoginPage />
// <Header />
// <NavBar />
// <StaffSite />
// <ManagerSite />

// should pass the user headers here (useState)
