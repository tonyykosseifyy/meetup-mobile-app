import { Image, View } from "react-native";


const FullLogo = () => {
    return (
        <Image className="" source={require("@/assets/images/full_logo.png")} alt="Logo Full" />
    )
}

const Logo = () => {
    return (
        <Image src="@/assets/images/logo.png" alt="Logo" />
    )
}

const LogoNavbar = () => {
    return (
        <View className="flex flex-row items-center justify-center w-full">
            <FullLogo />
        </View>
    )
}

export { FullLogo, Logo, LogoNavbar };