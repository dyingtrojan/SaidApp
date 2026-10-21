import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProp = {
  text: string;
  onClick: any;
};

export function NotApparentButton(props: ButtonProp) {
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
    backgroundColor: "#0000002d",
    color: "#ffffff",
    borderColor: "#ffffff00",
    textDecorationLine: "none",
    textDecorationColor: "#ffffff",
    borderRadius: 15,
    width: 200,
    height: 30,
    marginBottom: 20,
    textAlign: "center",
    borderBottomColor: "black",
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  a: {
    textDecorationLine: "none",
    textDecorationColor: "white",
    color: "black",
    textAlign: "center",
    alignSelf: "center",
  },
});
