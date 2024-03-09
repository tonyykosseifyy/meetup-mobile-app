import React from "react";

export interface ChipProps {
  active: boolean;
  text: string;
  icon: React.ReactElement;
  onPress: () => void
}