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
          title: "My Requests",

          tabBarIcon: ({ color }) => {
            return (
              <View className="flex flex-col items-center">
                <FontAwesome6 size={26} name="bell" color={color} />
                <Text className="text-[11px] text-slate-500 mt-1">Notifications</Text>
              </View>
            );
          }

        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <View className="flex flex-col items-center">
              <FontAwesome6 size={26} name="compass" color={color} />
              <Text className={`text-[11px] text-slate-500 mt-1`}>Discover</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View className="flex flex-col items-center">
              <SettingsIcon width={26} height={25} fill={color} />
              <Text className="text-[11px] text-slate-500 mt-1">Settings</Text>
            </View>
          ),
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
      className="bg-white py-1 backdrop-blur-sm backdrop-brightness-125"
      style={[{ paddingBottom: bottom - 30 }, override_styles.shadow]}
    >
      <View className="flex flex-row items-center justify-around">
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
  return (
    <Pressable onPress={onPress} className="mb-5 pt-1">
      <Animated.View>
        {options.tabBarIcon ? (
          options.tabBarIcon({
            color: active ? "#d14d72" : "#475569",
            active,
          })
        ) : (
          <Text>?</Text>
        )}
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
