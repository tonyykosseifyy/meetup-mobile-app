import { Image, View } from "react-native";

const FullLogo = () => {
  return (
    <View>
      <Image
        className="h-8"
        source={require("@/assets/images/full_logo3.png")}
        alt="Logo Full"
        resizeMode="contain"
      />
    </View>
  );
};

const Logo = () => {
  return <Image src="@/assets/images/logo.png" alt="Logo" />;
};

const LogoNavbar = () => {
  return (
    <View className="flex flex-row items-center justify-center w-full">
      <FullLogo />
    </View>
  );
};

export { FullLogo, Logo, LogoNavbar };
