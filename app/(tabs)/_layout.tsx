import React, { useEffect, useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6.js";
import { Tabs } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../tailwind.config.js";
import SettingsIcon from "@/assets/icons/navbar/settings.svg";
import { Animated } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ tabBarInactiveTintColor: "blue", headerShown: false }}
    >
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => {
            return <FontAwesome6 size={28} name="bell" color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
          tabBarIcon: ({ color }) => <SettingsIcon width={25} height={25} fill={color} />,
        }}
      />
    </Tabs>
  );
}

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: any) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="bg-white py-1"
      style={[{ paddingBottom: bottom - 30 }, override_styles.shadow]}
    >
      <View className="flex flex-row place-content-evenly justify-evenly">
        {routes.map((route: any, index: any) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

const TabBarComponent = ({ active, options, onPress }: any) => {
  const iconAnim = useRef(new Animated.Value(0)).current; // Controls icon movement
  const dotOpacityAnim = useRef(new Animated.Value(0)).current; // Controls dot visibility

  useEffect(() => {
    // Animate icon upwards and dot opacity
    Animated.parallel([
      Animated.timing(iconAnim, {
        toValue: active ? -10 : 0, // Move up by 10 units if active
        duration: 200,
        useNativeDriver: true, // Using native driver for better performance
      }),
      Animated.timing(dotOpacityAnim, {
        toValue: active ? 1 : 0, // Fully visible if active, otherwise hidden
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [active, iconAnim, dotOpacityAnim]);

  return (
    <Pressable onPress={onPress} className="py-3">
      <Animated.View style={{ transform: [{ translateY: iconAnim }] }}>
        {options.tabBarIcon ? (
          options.tabBarIcon({
            color: active ? theme!.extend!.colors!.cabaret[500] : "#7a7a7a",
            active,
          })
        ) : (
          <Text>?</Text>
        )}
        <Animated.View
          style={{
            opacity: dotOpacityAnim, // Control opacity through animated value
          }}
        >
          <View className="h-2 w-2 mt-2 mx-auto bg-cabaret-500 rounded-full" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const override_styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
});
