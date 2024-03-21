import { View, Image, Touchable, TouchableOpacity, ScrollView, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import DateChip from "@/components/chat/datechip";
import Message from "@/components/chat/message";
import ChatButton from "@/components/chat/button";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import LocationIcon from "@/assets/icons/settings/location.svg";
import styles from "@/constants/styles";
import PlaceChip from "@/components/chat/placechip";

enum Sender {
  Me = "me",
  Her = "her",
}
const places = ["bartartine", "younes"];

export default function PreLogin() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [place, setPlace] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const snapPoints = useMemo(() => ["50%", "70%"], []);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    handleCollapsePress();
  };
  const handleOpenPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const handlePlaceChange = (newPlace: string) => {
    place === newPlace ? setPlace("") : setPlace(newPlace);
  };
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#F6F6F6] relative">
      <View className={`flex justify-between  bg-white flex-auto`}>
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
        index={-1}
      >
        <View className="flex-1 bg-white mx-6">
          {/* text for the meeting scheduling */}
          <View className="flex items-center">
            <Text className="text-2xl font-semibold mt-4">Schedule a Meeting</Text>
            <Text className="text-sm mt-1">Pick a place and time for the meeting</Text>
          </View>

          {/* location input */}

          <View className="flex mt-10">
            <View className="flex flex-row items-center">
              <LocationIcon width={20} />
              <Text className="text-base font-light ml-2">Place</Text>
            </View>

            <View className="h-[0.5px] w-full bg-gray-200 mb-2" />

            <ScrollView
              horizontal={true}
              contentContainerStyle={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              {places.map((placeItem) => (
                <PlaceChip
                  onPress={() => handlePlaceChange(placeItem)}
                  active={placeItem === place}
                  title={placeItem}
                />
              ))}
            </ScrollView>
            <View className="h-[0.5px] w-full bg-gray-200 mt-2" />
          </View>
          {/* <Button title="Close" onPress={handleClosePress} /> */}
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
