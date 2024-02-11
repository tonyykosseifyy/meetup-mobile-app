import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { FullLogo, LogoNavbar } from '@/components/logo';


export default function NotFoundScreen() {
  
  return (
      <View className="bg-white flex-1">
        <LogoNavbar />
        <Text >Home</Text>
        <Text className="text-white">asdasdasdasd</Text>
        <Link href="/">
          <Text></Text>
        </Link>
      </View>
  );
};
