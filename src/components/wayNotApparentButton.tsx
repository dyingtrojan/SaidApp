import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type ButtonProp = {
  text: string;
  onClick: any;
};

export function WayNotApparentButton(props: ButtonProp) {
  return (
    <View style={styles.wnabutton}>
      <Pressable style={styles.pressable} onPress={props.onClick}>
        <Text style={styles.wnaA}>{props.text}</Text>
      </Pressable>
    </View>
  );
}
