import { View, Image, Touchable, TouchableOpacity, ScrollView, Button } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Footer } from "@/components";
import { Link as ExpoLink } from "expo-router";
import React, { useRef, useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import DateChip from "@/components/chat/datechip";
import Message from "@/components/chat/message";
import ChatButton from "@/components/chat/button";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

enum Sender {
  Me = "me",
  Her = "her",
}

export default function PreLogin() {
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [open, setOpen] = useState<boolean>(false);

  const snapPoints = useMemo(() => ["50%", "50%", "80%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => {
    setOpen(false);
    bottomSheetRef.current?.close();
    handleCollapsePress();
  };
  const handleOpenPress = () => {
    setOpen(true);
    bottomSheetRef.current?.snapToIndex(0);
  };
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );
  console.log(open);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#F6F6F6] relative">
      <View
        className={`flex justify-between pb-10 bg-white flex-auto flex- ${open ? "flex-auto h-32" : "flex-1"}`}
      >
        <View className="bg-[#F6F6F6] flex flex-row items-center justify-between px-6 h-20">
          <View className="flex flex-row items-center">
            <TouchableOpacity>
              <MaterialIcons name="arrow-back-ios-new" size={25} color="black" />
            </TouchableOpacity>
            <View className="w-12 h-12 p-[0.5px] rounded-full border-solid border-[2px] border-cabaret-500 ml-5">
              <Image
                source={require("@/assets/avatars/adjusted_avatar_1.png")}
                className="w-full h-full rounded-full object-contain"
              />
            </View>
            <View className="ml-3 ">
              <Text className="text-black text-lg font-medium -mt-1">John Doe</Text>
              <Text className="text-cabaret-500 -mt-[0.7px] font-semibold text-xs">
                Software Developer
              </Text>
            </View>
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={27} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          className="flex-1 pt-6 mx-6 relative"
        >
          <DateChip date="Today" />
          <View className="mt-6 flex items-end">
            <Message message="Hey, bartartine @ 5:00 PM ?" date={new Date()} sender={Sender.Me} />
            <Message message="Can’t Make it" date={new Date()} sender={Sender.Her} />
            <Message message="Younes Tue @ 7:00 PM" date={new Date()} sender={Sender.Her} />
            <Message message="Hey, bartartine @ 5:00 PM ?" date={new Date()} sender={Sender.Me} />
            <Message message="Can’t Make it" date={new Date()} sender={Sender.Her} />
            <Message message="Younes Tue @ 7:00 PM" date={new Date()} sender={Sender.Her} />
          </View>
          <View className="mt-12 h-[0.6px] bg-cabaret-500 w-full mx-auto" />
          <View className="flex flex-row justify-between items-center mt-6">
            <ChatButton onPress={() => handleOpenPress()} positive={false} />
            <ChatButton onPress={() => {}} positive={true} />
          </View>
          <View className="h-20" />
        </ScrollView>
      </View>

      <BottomSheet
        style={{ backgroundColor: "transparent" }}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
      ></BottomSheet>

      {/* <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{ backgroundColor: "white", height: 500 }}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "black" }}
        backgroundStyle={{ backgroundColor: "white" }}
        backdropComponent={renderBackdrop}
      >
        <View className="flex-1 items-center justify-center">
          <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
          <Button title="Close" onPress={handleClosePress} />
        </View>
      </BottomSheet> */}
    </SafeAreaView>
  );
}

{
  /* <Button title="Open" onPress={handleOpenPress} />
        <Button title="Close" onPress={handleClosePress} />
        <Button title="Collapse" onPress={handleCollapsePress} />
        <Button title="Snap To 0" onPress={() => snapeToIndex(0)} />
        <Button title="Snap To 1" onPress={() => snapeToIndex(1)} />
        <Button title="Snap To 2" onPress={() => snapeToIndex(2)} /> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});
