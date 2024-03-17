import Registration from "@/components/registration";
import data from "@/assets/data/registration_data";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpMyself = () => (
  <SafeAreaView edges={["top"]} className="flex-1 bg-white">
    <Registration data={data.myself} />
  </SafeAreaView>
);

export default SignUpMyself;
