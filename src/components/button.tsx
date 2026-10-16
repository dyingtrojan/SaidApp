import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProp = {
  text: string;
  onClick: any;
};

export function Button(props: ButtonProp) {
  return (
    <View style={styles.button}>
      <Pressable onPress={props.onClick}>
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
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  a: {
    textDecorationLine: "none",
    textDecorationColor: "white",
    color: "white",
    textAlign: "center",
    alignSelf: "center",
  },
});
