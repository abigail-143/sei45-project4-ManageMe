import React from "react";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const RegisterUser: React.FC<props> = (props) => {
  return (
    <>
      <div>register user</div>
      <div>{props.role}</div>
    </>
  );
};
