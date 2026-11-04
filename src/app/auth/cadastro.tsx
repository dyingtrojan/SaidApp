import { signUpNewUser } from "@/app/auth/authContext";
import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [userName, setUserName] = useState("");
  const [dataNasc, setDataNasc] = useState(new Date());

  return (
    <ScrollView>
      <View style={styles.container}>
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
          <Text>Nome</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#00000046"
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          ></TextInput>
          <Text>{"\n"}</Text>
          <Text>Nome de usuário</Text>
          <TextInput
            value={userName}
            placeholderTextColor="#00000046"
            onChangeText={setUserName}
            style={styles.input}
            placeholder="@nome_de_usuario"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Text>E-mail</Text>
          <TextInput
            value={email}
            placeholderTextColor="#00000046"
            autoComplete="email"
            onChangeText={setEmail}
            style={styles.input}
            placeholder="exemplo@dominio.com"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Text>Senha</Text>
          <TextInput
            value={senha}
            placeholderTextColor="#00000046"
            onChangeText={setSenha}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Insira sua senha aqui"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Button
            text="Concluir"
            onClick={() => signUp(nome, email, senha, userName)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export async function signUp(
  nome: string,
  email: string,
  password: string,
  userName: string,
) {
  if (password.length < 6) {
    alert("A senha deve ser maior que 6 caracteres");
    router.replace("/auth/cadastro");
    return "Incorrect Password";
  }
  if (nome && email && userName && password) {
    const res = await signUpNewUser(nome, email, password, userName);
    if (res.success == false) {
      router.replace("/");
    }
    if (res.success && !res.error) {
      router.replace("/(tabs)");
    }
  }
}
