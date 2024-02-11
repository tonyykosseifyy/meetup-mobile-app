import { Link } from 'expo-router';
import { Text, View, Image } from 'react-native';
import { LogoNavbar } from '@/components/logo';


export default function PreLogin() {
  return (
      <View className="bg-white flex-1">
        <LogoNavbar />
        <View className='w-full'>
          <Image source={require("@/assets/images/pre_login.png")} alt="Pre Login" className="w-full h-96" />
        </View>
      </View>
  );
};
