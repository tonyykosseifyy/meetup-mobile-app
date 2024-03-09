import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { ButtonProps } from "./interface.button";
import styles from "@/constants/styles";

const Button = React.forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
  const { rounded, children, icon } = props;

  return (
    <TouchableOpacity
      ref={ref}
      className={`bg-cabaret-500 w-full flex flex-row justify-center p-4 relative shadow-lg ${
        rounded ? "rounded-full" : "rounded-lg"
      }`}
      {...props}
      style={styles.cabaret_shadow}
    >
      <View className="absolute inset-y-0 left-0 flex flex-col items-center justify-center ">
        <View
          className={`bg-white ml-2 h-9 w-9 flex flex-row items-center justify-center rounded-full ${
            rounded ? "flex" : "hidden"
          }`}
        >
          {icon}
        </View>
      </View>
      <Text className="text-white font-semibold text-base">{children}</Text>
    </TouchableOpacity>
  );
});


export { Button };