import { styles } from "@/components/styles";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
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
      <Image style={{width: "10%", height: "10%"}} source={require("@/assets/images/saidapp_nobackground.png")}></Image>
      <View style={{flexDirection: "row", rowGap: 0}}>
        <Text style={styles.titleScreenText_part1}>Said</Text>
        <Text style={styles.titleScreenText_part2}>App</Text>
      </View>
      <Text>{"\n"}</Text>
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
