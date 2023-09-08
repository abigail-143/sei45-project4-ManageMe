import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { ManagerSite } from "./Pages/ManagerSite";
import { StaffSite } from "./Pages/StaffSite";

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [role, setRole] = useState<string>("Manager");

  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/staff" element={<StaffSite></StaffSite>}></Route>
          <Route
            path="/manager"
            element={<ManagerSite role={role}></ManagerSite>}
          ></Route>
        </Routes>
      </Suspense>
    </div>
    // <>
    //   {login && <LoginPage></LoginPage>}
    //   {role === "Manager" && <ManagerSite role={role}></ManagerSite>}
    //   {role === "Staff" && <StaffSite></StaffSite>}
    // </>
  );
};

export default App;

// <LoginPage />
// <Header />
// <NavBar />
// <StaffSite />
// <ManagerSite />

// should pass the user headers here (useState)
