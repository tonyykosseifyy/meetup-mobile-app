import React from 'react';
import { View, Text, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-cabaret-500">
      <Image
        source={require('../../assets/images/logo.svg')}
        className="w-50 h-50 mb-5" // Tailwind classes for width, height, and margin-bottom
      /> 
      <Text className="text-white text-lg">Loading...</Text>
    </View>
  );
};
export default SplashScreen ;