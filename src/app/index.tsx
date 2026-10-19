import { styles } from "@/components/styles";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { checkIfLogged } from "./auth/authContext";

export default function Index() {
  useEffect(() => {
    async function checkLogin() {
      const logged = await checkIfLogged();
      if (logged == true) {
        router.replace("/(tabs)");
      }
    }
    checkLogin();
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SaidApp</Text>
      <Text>
        Marque saidas com seus amigos,{"\n"}crie novas amizades{"\n"}e crie
        memorias que ficarão marcadas.
      </Text>
      <View style={styles.buttons}>
        <Link style={styles.button} href="./auth/cadastro">
          Criar Conta
        </Link>
        <Text>{"\n"}</Text>
        <Link style={styles.button} href={"./auth/login"}>
          Fazer Login
        </Link>
      </View>
    </View>
  );
}
