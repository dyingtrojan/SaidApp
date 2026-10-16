import { SaidaCard } from "@/components/saidaCard";
import { StyleSheet, View } from "react-native";

export default function TelaInicial() {
  return (
    <View>
      <View style={styles.center}>
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
