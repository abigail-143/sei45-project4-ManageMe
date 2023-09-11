import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { ManagerSite } from "./Pages/ManagerSite";
import { StaffSite } from "./Pages/StaffSite";
import UserContext from "./context/user";

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [role, setRole] = useState<string>("Staff");
  const [accessToken, setAccessToken] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [userStatus, setUserStatus] = useState<boolean>(true);
  const [accountType, setAccountType] = useState<string>("");

  return (
    <div>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          userID,
          setUserID,
          username,
          setUsername,
          email,
          setEmail,
          company,
          setCompany,
          userStatus,
          setUserStatus,
          accountType,
          setAccountType,
        }}
      >
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={
                <LoginPage
                  role={role}
                  setRole={setRole}
                  login={login}
                  setLogin={setLogin}
                ></LoginPage>
              }
            ></Route>
            {role === "Manager" && login && (
              <Route
                path="/main"
                element={<ManagerSite role={role}></ManagerSite>}
              ></Route>
            )}
            {role === "Staff" && login && (
              <Route
                path="/main"
                element={<StaffSite role={role}></StaffSite>}
              ></Route>
            )}
          </Routes>
        </Suspense>
      </UserContext.Provider>
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
