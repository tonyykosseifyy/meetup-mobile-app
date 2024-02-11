import { Text } from "react-native";


const CustomText = (props: any) => {
    return (
        <Text className="font-sans font-regular" {...props}/>
    );
}

export default CustomText ;