import React from "react";

export interface HeaderProps {
  leftButton?: boolean;
  rightButton?: React.ReactElement;
  theme?: "light" | "dark";
}
