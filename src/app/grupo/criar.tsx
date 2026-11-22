import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { ContainerStyles } from "@/components/styles/containerStyles";
import { HeaderStyles } from "@/components/styles/headerStyles";
import { criarGrupo } from "@/lib/databaseHandler";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CriarGrupoPage() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <View style={ContainerStyles.centerContainer}>
      <View style={ContainerStyles.formContainer}>
        <View style={HeaderStyles.header}>
          <Link
            style={{ fontWeight: "500", fontSize: 20 }}
            href={"/(tabs)/grupos"}
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
