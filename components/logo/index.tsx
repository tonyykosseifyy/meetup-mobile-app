import { Image, View } from "react-native";

const FullLogo = () => {
  return (
    <View className="w-32 h-8 ">
      <Image
        className="w-full h-full object-contain"
        source={require("@/assets/images/full_logo3.png")}
        alt="Logo Full"
      />
    </View>
  );
};

const Logo = () => {
  return <Image src="@/assets/images/logo.png" alt="Logo" />;
};

const LogoNavbar = () => {
  return (
    <View className="flex flex-column items-center justify-center w-full">
      <FullLogo />
    </View>
  );
};

export { FullLogo, Logo, LogoNavbar };
