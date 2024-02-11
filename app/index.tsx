import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  console.log("i am here");
  return (
      <View className=" ">
        <Text >Home</Text>
        <Text className="text-white">asdasdasdasd</Text>
        <Link href="/">
          <Text></Text>
        </Link>
      </View>
  );
};
