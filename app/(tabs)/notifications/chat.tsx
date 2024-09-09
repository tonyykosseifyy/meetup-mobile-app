import {
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import DateChip from "@/components/chat/datechip";
import Message from "@/components/chat/message";
import ChatButton from "@/components/chat/button";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import LocationIcon from "@/assets/icons/settings/location.svg";
// import styles from "@/constants/styles";
import PlaceChip from "@/components/chat/placechip";
import TimeIcon from "@/assets/icons/chat/time.svg";
import { Button } from "@/components";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMe } from "@/api/axios/users";
import { MeetupRequestResponse } from "@/interfaces";
import {
  changeMeetingStatus,
  requestMeetings,
  requestPlaceTimeForMeeting,
  retrieveMeeting,
} from "@/api/axios/meetup";
enum Sender {
  Me = "me",
  Her = "her",
}
const places = ["bartartine", "younes"];
const times = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export default function PreLogin() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [place, setPlace] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    // bottomSheetRef.current?.forceClose();
    // handleCollapsePress();
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

  const id = useLocalSearchParams().meetingId as string;

  const { data: meeting, isLoading: isLoadingMeeting } = useQuery(
    "/meetup/me/meeting-requests/" + id + "/",
    {
      queryFn: () => retrieveMeeting({ id }),
      retry: 2,
      onSuccess: (data) => {},
    }
  );

  const queryClient = useQueryClient();

  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: "getMe",
    retry: 2,
    queryFn: () => getMe(),
  });

  const {
    mutate: proposePlaceTime,
    isLoading: isProposingPlaceTime,
    isError: isProposingPlaceTimeError,
    error: proposingPlaceTimeError,
  } = useMutation<
    unknown,
    unknown,
    {
      id: number;
      timeSlot: string;
      place: string;
    }
  >({
    mutationFn: ({ id, timeSlot, place }) => {
      return requestPlaceTimeForMeeting({ id, timeSlot, place });
    },
    mutationKey: "/meetup/meeting-requests/place-time-requests/",
    retry: false,
    onSuccess: (data) => {
      handleClosePress();
      setTime("");
      setPlace("");
      queryClient.invalidateQueries("/meetup/me/meeting-requests/" + id + "/");
    },
  });

  const {
    mutate: changeStatusMeeting,
    isLoading: isChangeStatusMeeting,
    isError: isChangeStatusMeetingError,
    error: changeStatusMeetingError,
  } = useMutation<unknown, unknown, { id: number; status: "accept" | "reject" }>({
    mutationFn: ({ id, status }) => {
      return changeMeetingStatus({ id, status });
    },
    mutationKey: "/meetup/meeting-requests/respond/",
    retry: false,
    onSuccess: (data) => {
      console.log("MEETING" + data);
      handleClosePress();
      setTime("");
      setPlace("");
      queryClient.invalidateQueries("/meetup/me/meeting-requests/" + id + "/");
      queryClient.invalidateQueries("/meetup/me/meeting-requests/");
    },
  });

  if (isLoadingMeeting || isUserLoading) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-[#F6F6F6] relative">
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isWaitingYou = meeting?.status === "pending" && meeting?.request_to.id === userInfo?.id;

  const isLastMe =
    meeting?.place_time_requests?.[meeting?.place_time_requests?.length - 1]?.requested_by ===
    userInfo?.id;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#F6F6F6] relative">
      <View className={`flex justify-between  bg-white flex-auto`}>
        <View className="bg-[#F6F6F6] flex flex-row items-center justify-between px-6 h-20">
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios-new" size={25} color="black" />
            </TouchableOpacity>
            <View className="w-12 h-12 p-[0.5px] rounded-full border-solid border-[2px] border-cabaret-500 ml-5">
              <Image
                source={require("@/assets/avatars/adjusted_avatar_1.png")}
                className="w-full h-full rounded-full object-contain"
              />
            </View>
            <View className="ml-3 ">
              <Text className="text-black text-lg font-medium -mt-1">
                {meeting?.request_from.id == userInfo?.id
                  ? meeting?.request_to.user_info.full_name
                  : meeting?.request_from.user_info.full_name}
              </Text>
              <Text className="text-cabaret-500 -mt-[0.7px] font-semibold text-xs">
                {meeting?.request_from.id == userInfo?.id
                  ? meeting?.request_to.user_info.occupation
                  : meeting?.request_from.user_info.occupation}
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

          {meeting?.status === "pending" && meeting?.request_to.id === userInfo?.id ? (
            <>
              <Text className="text-gray-400 text-center mt-6">
                Pending request from{" "}
                {meeting?.request_from.id == userInfo?.id
                  ? meeting?.request_to.user_info.full_name
                  : meeting?.request_from.user_info.full_name}
                .
              </Text>
              <Text className="text-gray-400 text-center mt-2">Accept or Decline.</Text>
            </>
          ) : meeting?.place_time_requests && meeting?.place_time_requests.length >= 1 ? (
            <View className="mt-6 flex items-end">
              {meeting?.place_time_requests.map((request, i) => {
                return (
                  <>
                    {i >= 1 && (
                      <Message
                        message={`Can't make it`}
                        date={new Date(request.requested_at)}
                        sender={request.requested_by == userInfo?.id ? Sender.Me : Sender.Her}
                      />
                    )}
                    <Message
                      message={`${request.place.name} @ ${request.time.slot}`}
                      date={new Date(request.requested_at)}
                      sender={request.requested_by == userInfo?.id ? Sender.Me : Sender.Her}
                    />
                  </>
                );
              })}
            </View>
          ) : (
            <Text className="text-gray-400 text-center mt-6">No requests yet. Send one!</Text>
          )}
          <View className="mt-12 h-[0.6px] bg-cabaret-500 w-full mx-auto" />
          {meeting?.status == "accepted" ? (
            <Text className="mt-2 text-center">Meeting Set! 🎉</Text>
          ) : (
            <View
              className={`flex flex-row ${isLastMe ? "justify-center" : "justify-between"} items-center mt-6`}
            >
              <ChatButton
                onPress={
                  meeting?.status === "pending" && meeting?.request_to.id === userInfo?.id
                    ? () =>
                        changeStatusMeeting(
                          { id: meeting?.id, status: "reject" },
                          { onSuccess: () => router.back() }
                        )
                    : () => handleOpenPress()
                }
                positive={false}
                isLastMe={isLastMe}
                decline={meeting?.status === "pending" && meeting?.request_to.id === userInfo?.id}
              />
              {!isLastMe && (
                <ChatButton
                  onPress={
                    meeting?.status === "pending" ||
                    (meeting?.place_time_requests && meeting?.place_time_requests.length >= 1)
                      ? () => changeStatusMeeting({ id: meeting?.id, status: "accept" })
                      : () => Alert.alert("Error", "Please schedule a meeting first")
                  }
                  positive={true}
                />
              )}
            </View>
          )}

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
        <BottomSheetScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* text for the meeting scheduling */}
          <View className="flex-1 bg-white mx-6">
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
                    key={placeItem}
                    onPress={() => handlePlaceChange(placeItem)}
                    active={placeItem === place}
                    title={placeItem}
                  />
                ))}
              </ScrollView>

              <View className="h-[0.5px] w-full bg-gray-200 mt-2" />

              {/* time input */}
              <View className="flex flex-row items-center mt-6">
                <TimeIcon width={23} />
                <Text className="text-base font-light ml-2">Time</Text>
              </View>

              <View className="h-[0.5px] w-full bg-gray-200 mb-2" />
              {/* time chips */}

              <View className="flex flex-row flex-wrap justify-between">
                {times.map((timeItem) => (
                  <PlaceChip
                    key={timeItem}
                    // style={[styles.gridItem, timeItem === time && styles.active]}
                    active={timeItem === time}
                    onPress={() => {
                      time === timeItem ? setTime("") : setTime(timeItem);
                    }}
                    addClassName="w-[30%] my-2 justify-center flex-3 mr-0"
                    title={timeItem}
                  />
                ))}
              </View>

              <View className="h-[0.5px] w-full bg-gray-200 mt-2" />
            </View>
            <Button
              addClassName="mt-5"
              onPress={() =>
                !isProposingPlaceTime &&
                proposePlaceTime({ id: meeting?.id!, timeSlot: time, place })
              }
            >
              {isProposingPlaceTime ? "Loading..." : "Schedule"}
            </Button>
            <View className="h-24" />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
