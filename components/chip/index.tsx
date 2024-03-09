import React, { useEffect, useRef } from "react";
import { Pressable, Text, Animated } from "react-native";
import { ChipProps } from "./interface.chip";
import styles from "@/constants/styles";

const Chip = ({ active, icon, text, onPress }: ChipProps) => {
  // Ref for the animated value
  const animatedValue = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    // Animate the value when `active` changes
    Animated.timing(animatedValue, {
      toValue: active ? 1 : 0,
      duration: 200, // Duration of the animation
      useNativeDriver: false, // `useNativeDriver` should be false when animating colors
    }).start();
  }, [active]);

  // Interpolate the animated value to colors
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#d14d72"], // Change these colors as needed (inactive to active)
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000000", "#FFFFFF"], // Change text colors as needed
  });

  return (
    <Animated.View
      className="py-3 px-6 mx-1 mt-3 flex flex-row items-center justify-center rounded-full"
      style={[styles.grey_shadow, { backgroundColor }]}
    >
      <Pressable onPress={onPress} className={`flex flex-row items-center justify-center`}>
        {icon}
        <Animated.Text style={{ color: textColor, fontWeight: "bold" }}>{text}</Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default Chip;
