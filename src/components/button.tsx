import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

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
