import React, { useEffect, useReducer, useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6.js";
import FontAwesome from "@expo/vector-icons/FontAwesome.js";
import { Tabs } from "expo-router";
import { LayoutChangeEvent, Pressable, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";
import { theme } from "../../tailwind.config.js";

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
            console.log(color);
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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: any) => {
  const { bottom } = useSafeAreaInsets();

  // get information about the components position on the screen -----

  const reducer = (state: any, action: { x: number; index: number }) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };
  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) return 177 - 25;
    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View className="bg-cabaret-500" style={[{ paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        fill="none"
        className="absolute bottom-[89px]"
        viewBox="0 0 110 60"
        style={animatedStyles}
      >
        <Path
          fill={theme!.extend!.colors!.cabaret[500]}
          d="M20 35C20 15.67 35.67 0 55 0s35 15.67 35 35v5c0 11.046 8.954 20 20 20H0c11.046 0 20-8.954 20-20v-5z"
        />
      </AnimatedSvg>

      <View className="flex flex-row place-content-evenly justify-evenly">
        {routes.map((route: any, index: any) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e: any) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};
const TabBarComponent = ({ active, options, onLayout, onPress }: any) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
        {
          translateY: withTiming(active ? -50 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
      transform: [
        {
          translateY: withTiming(active ? -50 : 0, { duration: 250 }),
        },
      ],
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} className="h-[60px] w-[60px] mt-[-5px]">
      <Animated.View
        className="flex-1 rounded-[30px] bg-white"
        style={animatedComponentCircleStyles}
      />
      <Animated.View
        className="absolute top-0 bottom-0 right-0 left-0 justify-center items-center"
        style={animatedIconContainerStyles}
      >
        {/* @ts-ignore */}
        {options.tabBarIcon ? (
          options.tabBarIcon({ ref, color: active ? theme!.extend!.colors!.cabaret[500] : "white" })
        ) : (
          <Text>?</Text>
        )}
      </Animated.View>
    </Pressable>
  );
};
