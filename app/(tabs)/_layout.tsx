import React, { useEffect, useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6.js";
import { Tabs } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Animated } from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";

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
            const iconColor = color === "#d14d72" ? "#d14d72" : "#64748b";
            const styles =
              color === "#d14d72" ? "text-cabaret-500 font-semibold" : "text-slate-500";
            return (
              <View className="flex flex-col items-center w-20">
                <MaterialIcons name="chat-bubble-outline" size={22} color={iconColor} />
                {/* <MaterialIcons name="chat-bubble-outline" size={24} color="black" /> */}
                <Text className={`text-[11px] text-slate-500 mt-1 ${styles}`}>Inbox</Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            const iconColor = color === "#d14d72" ? "#d14d72" : "#64748b";
            const styles =
              color === "#d14d72" ? "text-cabaret-500 font-semibold" : "text-slate-500";
            return (
              <View className="flex flex-col items-center w-20">
                <Octicons name="people" size={22} color={iconColor} />
                {/* <Octicons name="people" size={24} color="black" /> */}
                <Text className={`text-[11px] text-slate-500 mt-1 ${styles}`}>Discover</Text>
              </View>
            );
          },
          // tabBarIcon: ({ color, focused }) => {
          //   console.log("foci", focused);
          //   return (
          //     <View className="flex flex-col items-center">
          //       <FontAwesome6 size={26} name="compass" color={color} />
          //       <Text
          //         className={`text-[11px] mt-1 ${focused ? "text-cabaret-500" : "text-slate-500"}`}
          //       >
          //         Discover
          //       </Text>
          //     </View>
          //   );
          // },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            const iconColor = color === "#d14d72" ? "#d14d72" : "#64748b";
            const styles =
              color === "#d14d72" ? "text-cabaret-500 font-semibold" : "text-slate-500";
            return (
              <View className="flex flex-col items-center w-20">
                <Octicons name="person" size={22} color={iconColor} />
                {/* <Octicons name="person" size={24} color="black" /> */}
                <Text className={`text-[11px] text-slate-500 mt-1 ${styles}`}>Profile</Text>
              </View>
            );
          },

          // tabBarIcon: ({ color }) => (
          //   <View className="flex flex-col items-center">
          //     <SettingsIcon width={26} height={25} fill={color} />
          //     <Text className="text-[11px] text-slate-500 mt-1">Settings</Text>
          //   </View>
          // ),
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
