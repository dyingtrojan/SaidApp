import { Button } from "@/components/button";
import { criarGrupo } from "@/lib/databaseHandler";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CriarGrupoPage() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Link
            style={{ fontWeight: "500", fontSize: 20 }}
            href={"/(tabs)/eventos"}
          >
            ← Voltar
          </Link>
          <Text>{"\n"}</Text>
        </View>
        <Text style={styles.title}>Criação de grupo</Text>
        <Text>Nome do grupo</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Descrição do grupo</Text>
        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          style={styles.multilineInput}
          multiline
          numberOfLines={4}
          maxLength={200}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Button
          text="Criar Grupo"
          onClick={() => criarGrupoWithRedirect(nome, descricao)}
        />
      </View>
    </View>
  );
}

async function criarGrupoWithRedirect(nome: string, descricao: string) {
  await criarGrupo(nome, descricao);
  router.replace("/(tabs)/grupos");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  form: {
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
  multilineInput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 200,
    height: 80,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
  },
});
