import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { ButtonProps } from "./interface.button";
import styles from "@/constants/styles";

const Button = React.forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
  const { rounded, children, icon, addClassName, textColor, disableShadow, view } = props;

  return (
    <TouchableOpacity
      ref={ref}
      className={` bg-cabaret-500 flex flex-row justify-center p-4 relative ${!disableShadow ? "shadow-lg" : ""} ${
        rounded ? "rounded-full" : "rounded-lg"
      } ${addClassName}`}
      {...props}
      style={!disableShadow ? styles.button : {}}
    >
      {icon && (
        <View className="absolute inset-y-0 left-0 flex flex-col items-center justify-center ">
          <View
            className={`bg-white ml-2 h-9 w-9 flex flex-row items-center justify-center rounded-full ${
              rounded ? "flex" : "hidden"
            }`}
          >
            {icon}
          </View>
        </View>
      )}

      {view ? (
        children
      ) : (
        <Text className={`text-${textColor ?? "white"} font-sans font-bold text-center`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
});


export { Button };