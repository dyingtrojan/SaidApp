import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { criarLocal } from "@/lib/databaseHandler";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function CriarLocal() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Link style={{ fontWeight: "500", fontSize: 20 }} href={"/local"}>
            ← Voltar
          </Link>
          <Text>{"\n"}</Text>
        </View>
        <Text style={styles.title}>Novo local</Text>
        <Text>{"\n"}</Text>
        <Text>Nome do local</Text>
        <TextInput value={nome} onChangeText={setNome} style={styles.input} />
        <Text>{"\n"}</Text>
        <Text>Descrição</Text>
        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          style={styles.multilineInput}
          multiline
          numberOfLines={4}
          maxLength={200}
        />
        <Text>{"\n"}</Text>
        <Button
          text="Salvar local"
          onClick={async () => {
            await criarLocal(nome, descricao);
            router.replace("/local");
          }}
        />
      </View>
    </View>
  );
}
