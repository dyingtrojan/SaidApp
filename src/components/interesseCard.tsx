import { Text, View } from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

type InteresseCardProps = {
  id: number;
  nome: string;
  pos_x?: Float;
  pos_y?: Float;
};

export function InteresseCard(props: InteresseCardProps) {
  return (
    <View>
      <Text>{props.nome}</Text>
    </View>
  );
}
