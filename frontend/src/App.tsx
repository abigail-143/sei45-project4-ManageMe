import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { ManagerSite } from "./Pages/ManagerSite";
import { StaffSite } from "./Pages/StaffSite";
import { RegisterUser } from "./Components/ManagerOnly/RegisterUser";

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [role, setRole] = useState<string>("Register");

  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          {role === "Manager" && (
            <Route
              path="/main"
              element={<ManagerSite role={role}></ManagerSite>}
            ></Route>
          )}
          {role === "Staff" && (
            <Route
              path="/main"
              element={<StaffSite role={role}></StaffSite>}
            ></Route>
          )}
          {role === "Register" && (
            <Route path="/main" element={<RegisterUser role={role}></RegisterUser>}></Route>
          )}
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
