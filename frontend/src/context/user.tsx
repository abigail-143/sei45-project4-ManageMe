import React from "react";
import { UserContextInterface } from "../InterfaceTypes";

const UserContext = React.createContext<UserContextInterface | undefined>(
  undefined
);

export default UserContext;
