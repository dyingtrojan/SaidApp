import { StyleSheet, Text, View } from "react-native";
import { Button } from "./button";

type SaidaCardProps = {
  titulo: string;
  local: string;
  grupo: string;
  imagemPath?: string;
};

export function SaidaCard(props: SaidaCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.titulo}</Text>
      <Text>{props.local}</Text>
      <Text>{props.grupo}</Text>
      <Button
        text="Participar"
        onClick={() => alert("Participando da saida")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    borderColor: "#575757",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 600,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
