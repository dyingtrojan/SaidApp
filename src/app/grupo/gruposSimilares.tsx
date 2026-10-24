import { GrupoCard } from "@/components/grupoCard";
import { styles } from "@/components/styles";
import {
  getGroup,
  getGroupsWithInterests,
  getInterestsOfUser,
} from "@/lib/databaseHandler";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserID } from "../auth/authContext";
import { Grupo } from "../interfaces/grupo";

export default function GrupoSimilares() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  useEffect(() => {
    async function fetchData() {
      const USER_ID = await getUserID();
      const interests = await getInterestsOfUser(USER_ID);
      const groups = await getGroupsWithInterests(interests);
      var grupos: Grupo[] = [];
      var vistos = new Set<string | number>();
      for (const listas of groups) {
        for (const item of listas) {
          if (!item) continue;
          const grupo = await getGroup(item["grupoid"]);
          if (grupo.data && !vistos.has(grupo.data.id)) {
            vistos.add(grupo.data.id);
            grupos.push(grupo.data as Grupo);
          }
        }
      }

      setGrupos(grupos);
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link
          style={{ fontWeight: "500", fontSize: 20 }}
          href={"/(tabs)/grupos"}
        >
          ← Voltar
        </Link>
        <Text>{"\n"}</Text>
      </View>
      <ScrollView>
        {grupos.map((grupo) => (
          <View key={grupo.id}>
            <GrupoCard
              key={grupo.id}
              nome={grupo.nome}
              id={grupo.id}
              descricao={grupo.descricao}
              usuarioCriadorID={grupo.usuariocriadorid}
            />
            <Text>{"\n"}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
