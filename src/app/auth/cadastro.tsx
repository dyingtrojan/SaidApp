import { Button } from "@/components/button";
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CadastroPage() {
  return (
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
        <TextInput style={styles.input} placeholder="Nome"></TextInput>
        <Text>{"\n"}</Text>
        <Text>Nome de usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="@nome_de_usuario"
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@dominio.com"
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha aqui"
        ></TextInput>
        <Text>{"\n"}</Text>
        <Button
          text="Concluir"
          style={styles.button}
          onClick={() => alert("Login Concluido")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  login: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#666565",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  header: {
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#000000",
    color: "#ffffff",
    borderColor: "#ffffff00",
    textDecorationLine: "none",
    textDecorationColor: "#ffffff",
    borderRadius: 15,
    width: 200,
    height: 60,
    marginBottom: 20,
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "space-evenly",
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 200,
    height: 40,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
  },
});
