import React from "react";
import { LoginPage } from "./Pages/LoginPage";
import { Header } from "./Components/Header";
import { NavBar } from "./Components/NavBar";

const App: React.FC = () => {
  return (
    <>
      {/* <LoginPage></LoginPage> */}
      <Header></Header>
      <NavBar></NavBar>
    </>
  );
};

export default App;

// <LoginPage />
// <StaffSite />
// <ManagerSite />

// should pass the user headers here (useState)
