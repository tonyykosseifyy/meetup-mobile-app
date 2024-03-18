import React from "react";
import { SvgProps } from "react-native-svg";

export interface ChipProps {
  active: boolean;
  text: string;
  Icon: React.FC<SvgProps>;
  onPress: () => void;
  pressableClassName?: string;
  textClassName?: string;
}
