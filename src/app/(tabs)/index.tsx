import { styles } from "@/components/styles";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { checkIfLogged } from "../auth/authContext";

export default function TelaInicial() {
  useEffect(() => {
    async function checkLogin() {
      const check = await checkIfLogged();
      if (check == false) {
        router.replace("/");
      }
    }
    checkLogin()
  }, []);
  const router = useRouter();
  return (
    <ScrollView style={styles.containerScroll}>
      <Text style={styles.subtitle}>
        Eventos marcados em grupos que participa
      </Text>
      <Text>{"\n"}</Text>
      <ScrollView horizontal style={styles.sidewaysContainer}>
      </ScrollView>
      <Text>{"\n"}</Text>
      <ScrollView>
        <Text style={styles.subtitle}>
          Recomendações de grupos para participar
        </Text>
        <Text>{"\n"}</Text>
      </ScrollView>
    </ScrollView>
  );
}
