import { styles } from "@/components/styles";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { checkIfLogged } from "./auth/authContext";
import { Button } from "@/components/button";
import { ContainerStyles } from "@/components/styles/containerStyles";

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
    <View style={ContainerStyles.centerContainer}>
      <Text style={styles.title}>SaidApp</Text>
      <Text>
        Marque saidas com seus amigos,{"\n"}crie novas amizades{"\n"}e crie
        memorias que ficarão marcadas.
      </Text>
      <View style={styles.buttons}>
        <Button text="Criar conta" onClick={() => router.push("/auth/cadastro")} />
        <Text>{"\n"}</Text>
        <Button text="Fazer Login" onClick={() => router.push("/auth/login")} />
      </View>
    </View>
  );
}
