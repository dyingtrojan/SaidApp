import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { signInWithEmail } from "./authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerStyles } from "@/components/styles/containerStyles";
import { HeaderStyles } from "@/components/styles/headerStyles";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={ContainerStyles.centerContainer}>
      <ScrollView contentContainerStyle={ContainerStyles.centerContainer}>
      <View>
        <View style={ContainerStyles.login}>
          <View style={HeaderStyles.header}>
            <Link style={{ fontWeight: "500", fontSize: 20 }} href={"/"}>
              ← Voltar
            </Link>
            <Text>{"\n"}</Text>
          </View>
                <View style={{flexDirection: "row", rowGap: 0}}>
        <Text style={styles.titleScreenText_part1}>Said</Text>
        <Text style={styles.titleScreenText_part2}>App</Text>
      </View>
          <Text>{"\n"}</Text>
          <Text>E-mail</Text>
          <TextInput
            placeholderTextColor="#00000046"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="exemplo@dominio.com"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Text>Senha</Text>
          <TextInput
            placeholderTextColor="#00000046"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Insira sua senha aqui"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Button text="Concluir" onClick={() => signIn(email, password)} />
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export async function signIn(email: string, password: string) {
  const result = await signInWithEmail(email, password);
  if (!result.error) {
    router.replace("/(tabs)");
  } else {
    alert("Credenciais invalidas!");
    router.replace("/auth/login");
  }
}
