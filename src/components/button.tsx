import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "./colors";

type ButtonProp = {
  text: string;
  onClick: any;
};

export function Button(props: ButtonProp) {
  return (
    <View style={ButtonStyles.button}>
      <Pressable style={ButtonStyles.pressable} onPress={props.onClick}>
        <Text style={ButtonStyles.text}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const ButtonStyles = StyleSheet.create({
  text: {
      flex: 1,
      color: "white",
  },
  button: {
      backgroundColor: Colors.darkTeal,
      color: "#ffffff",
      borderColor: "#ffffff00",
      textDecorationLine: "none",
      textDecorationColor: "#ffffff",
      borderRadius: 15,
      width: 200,
      height: 60,
      marginBottom: 20,
  },
  pressable: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center", 
  }
})