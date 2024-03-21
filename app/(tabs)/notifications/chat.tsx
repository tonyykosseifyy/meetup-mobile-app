import { requestMeetings } from "@/api/axios/meetup";
import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "react-query";
import { Image } from "react-native";
import { useAuth } from "@/api/mutations/auth/AuthProvider";

function formatTimeTo12Hour(datetimeStr: string): string {
  const date = new Date(datetimeStr);

  // Extract hours and minutes
  let hours = date.getUTCHours(); // Use getUTCHours() to get the time in UTC
  const minutes = date.getUTCMinutes(); // Use getUTCMinutes() for minutes in UTC

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format minutes to be always two digits
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Construct formatted time string
  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}

export default function Tab() {
  const { isLoading, data, error } = useQuery("requestMeetings", requestMeetings);
  const { userInfo } = useAuth();
  if (isLoading) return <Text>Loading meetings...</Text>;

  return (
    <View style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
      <Text>Test</Text>
    </View>
  );
}
