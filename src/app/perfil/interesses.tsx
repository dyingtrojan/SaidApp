import { SelectItem } from "@/components/selectItem";
import { styles } from "@/components/styles";
import { getAllInterests } from "@/lib/databaseHandler";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Interesse } from "../interfaces/interesse";

export default function InteressesPages() {
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllInterests();
      if (result.data) {
        setInteresses(result.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View style={styles.header}>
        <Link
          style={{ fontWeight: "500", fontSize: 20 }}
          href={"/(tabs)/perfil"}
        >
          ← Voltar
        </Link>
        <Text>{"\n"}</Text>
        <Text style={styles.subtitle}>Selecione seus interesses</Text>
        <Text>{"\n"}</Text>
      </View>
      <ScrollView>
        {interesses.map((interesse) => (
          <View key={interesse.id}>
            <SelectItem
              id={interesse.id}
              text={interesse.nome}
              key={interesse.id}
              onClick={() => alert(`${interesse.id}`)}
            />
            <Text>{"\n"}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
