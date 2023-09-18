import React from "react";
import { Navigation } from "../Navigation/Navigation";
import "./Header.scss";
import { Login } from "./Login/Login";
import { useUserStore } from "../../stores/user-store";
import { User } from "./User/User";

export function Header() {
  const user = useUserStore((state) => ({ userName: state.userName }));

  return (
    <>
      <Navigation></Navigation>
      {user?.userName ? (
        <User userName={user.userName}></User>
      ) : (
        <Login></Login>
      )}
    </>
  );
}
