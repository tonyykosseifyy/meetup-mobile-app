import OTPInputView from "@twotalltotems/react-native-otp-input";
import { StyleSheet, View } from "react-native";

const OTP: React.FC = () => {
  return (
    <View className="flex flex-row items-center justify-center mt-12">
      <OTPInputView
        style={{ width: "90%", height: 100 }}

        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad={false}
        placeholderCharacter={"-"}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        selectionColor={"white"}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 65,
    height: 65,
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: "#D14D72",
    color: "white",
    fontSize: 20,
    // shadow 
    shadowColor: "#FF3366",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
export default OTP;
