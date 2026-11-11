import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { signInWithEmail } from "./authContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.login}>
          <View style={styles.header}>
            <Link style={{ fontWeight: "500", fontSize: 20 }} href={"/"}>
              ← Voltar
            </Link>
            <Text>{"\n"}</Text>
          </View>
          <Text style={styles.title}>SaidApp</Text>
          <Text>
            Marque saidas com seus amigos,{"\n"}crie novas amizades{"\n"}e crie
            memorias que ficarão marcadas.{"\n"}
          </Text>
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
