import { TouchableOpacity, View, StyleSheet } from "react-native";
import Text from "@/components/text";

const Button = (props: any) => {
  const { rounded, children, icon } = props;
  
  return (
    <TouchableOpacity
      className={`bg-cabaret-500 w-full flex flex-row justify-center p-4 relative shadow-lg ${
        rounded ? "rounded-full" : "rounded-lg"
      }`}
      {...props}
      style={styles.button}
    >
      <View className="absolute inset-y-0 left-0 flex flex-col items-center justify-center ">
        <View
          className={`bg-white ml-2 h-9 w-9 flex flex-row items-center justify-center rounded-full ${
            rounded ? "flex" : "hidden"
          }`}
        >
            {icon}
        </View>
      </View>
      <Text className="text-white font-sans font-bold text-center">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };

const styles = StyleSheet.create({
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2
  },
});
