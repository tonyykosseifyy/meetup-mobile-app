import React from "react";
import Registration from "@/components/registration";
import data from "@/assets/data/registration_data";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpMothers = () => (
  <SafeAreaView edges={["top"]} className="flex-1 bg-white">
    <Registration data={data.mothers} />
  </SafeAreaView>
);

export default SignUpMothers;
