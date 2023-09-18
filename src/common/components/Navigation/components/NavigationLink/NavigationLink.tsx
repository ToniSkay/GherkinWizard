import { NavLink } from "react-router-dom";
import React from "react";
import "./NavigationLink.scss";

interface IProps {
  link: string;
  name: string;
}

export function NavigationLink({ link, name }: IProps) {
  return (
    <NavLink to={link} className="nav-link hover-underline-animation">
      {name}
    </NavLink>
  );
}
