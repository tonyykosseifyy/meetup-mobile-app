import React, { useEffect, useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6.js";
import { Tabs } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../tailwind.config.js";
import SettingsIcon from "@/assets/icons/settings.svg";

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
          tabBarIcon: ({ color }) => <SettingsIcon width={20} height={20} fill={color} />,
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
    <View className="bg-white py-1" style={[{ paddingBottom: bottom - 6 }, override_styles.shadow]}>
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
const TabBarComponent = ({ active, options, onLayout, onPress }: any) => {
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  return (
    <Pressable onPress={onPress} onLayout={onLayout} className="py-3">
      <View>
        {/* @ts-ignore */}
        {options.tabBarIcon ? (
          options.tabBarIcon({
            ref,
            color: active ? theme!.extend!.colors!.cabaret[500] : "black",
            active,
          })
        ) : (
          <Text>?</Text>
        )}
      </View>
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
