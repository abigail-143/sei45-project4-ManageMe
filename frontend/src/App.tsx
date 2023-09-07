import React, { useState } from "react";
import { LoginPage } from "./Pages/LoginPage";
import { Header } from "./Components/Header";
import { NavBar } from "./Components/NavBar";

const App: React.FC = () => {
  const [role, setRole] = useState<string>("Manager")

  return (
    <>
      {/* <LoginPage></LoginPage> */}
      <Header role={role}></Header>
      <NavBar role={role}></NavBar>
    </>
  );
};

export default App;

// <LoginPage />
// <StaffSite />
// <ManagerSite />

// should pass the user headers here (useState)
