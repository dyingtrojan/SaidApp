import { Button } from "@/components/button";
import { GrupoCard } from "@/components/grupoCard";
import { styles } from "@/components/styles";
import { getGroupsLocalUserIsMemberInfo } from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Grupo } from "../interfaces/grupo";

export default function Grupos() {
  const [data, setData] = useState<Grupo[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await getGroupsLocalUserIsMemberInfo();
        setData(resultado);
      } catch (error) {
        console.log("erro: " + error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.fixedHeader}>
            <Button
              text="Criar grupo"
              onClick={() => router.replace("/grupo/criar")}
            />
            <Button
              text="Ver grupos que pode participar"
              onClick={() => router.replace("/grupo/gruposSimilares")}
            />
          </View>
        </View>
        <Text>{"\n"}</Text>
        <Text style={styles.subtitle}>Grupos você que participa</Text>
        <Text>{"\n"}</Text>
        <ScrollView>
          {data?.map((grupo) => (
            <View key={grupo.id}>
              <GrupoCard
                key={grupo.id}
                id={grupo.id}
                nome={grupo.nome}
                descricao={grupo.descricao}
              />
              <Text>{"\n"}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
