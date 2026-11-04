import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProp = {
  text: string;
  onClick: any;
};

export function Button(props: ButtonProp) {
  return (
    <View style={styles.button}>
      <Pressable style={styles.pressable} onPress={props.onClick}>
        <Text style={styles.a}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000000",
    color: "#ffffff",
    borderColor: "#ffffff00",
    textDecorationLine: "none",
    textDecorationColor: "#ffffff",
    borderRadius: 15,
    width: 200,
    height: 60,
    marginBottom: 20,
  },
  a: {
    textDecorationLine: "none",
    textDecorationColor: "white",
    color: "white",
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
