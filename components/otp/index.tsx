import OTPInputView from "@twotalltotems/react-native-otp-input";
import React from "react";
import { StyleSheet, View } from "react-native";

interface OTPProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<String>>;
}

const OTP = ({ value, onChange }: OTPProps) => {
  return (
    <View className="flex flex-row items-center justify-center">
      <OTPInputView
        style={{ width: "100%", height: 100 }}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad={false}
        placeholderCharacter={"-"}
        codeInputFieldStyle={styles.codeInput}
        codeInputHighlightStyle={styles.codeInputValid}
        selectionColor={"white"}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
        code={value}
        onCodeChanged={onChange}
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

  codeInput: {
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
  codeInputValid: {
    shadowOpacity: 0.6,
    elevation: 5,
  },
});
export default OTP;
