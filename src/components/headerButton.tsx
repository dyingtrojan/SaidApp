import { Pressable, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { Colors } from "./colors";

type ButtonProp = {
  text: string;
  onClick: any;
};

export function HeaderButton(props: ButtonProp) {
  return (
    <View style={style.container}>
      <Pressable style={style.clickArea} onPress={props.onClick}>
        <Text style={style.text}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#00000000",
    borderWidth: 1,
    color: Colors.brown,
    borderColor: "#000000",
    textDecorationLine: "none",
    textDecorationColor: "#ffffff",
    borderRadius: 15,
    width: 175,
    height: 65,
    padding: 8
  },
  clickArea:{
    height: "100%",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    textAlign: "center",
    
    color: "black",
  }
})
