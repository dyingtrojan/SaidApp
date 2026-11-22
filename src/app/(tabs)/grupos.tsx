import { Button } from "@/components/button";
import { GrupoCard } from "@/components/grupoCard";
import { styles } from "@/components/styles";
import { getGroupsLocalUserIsMemberInfo } from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Grupo } from "../interfaces/grupo";
import { checkIfLogged } from "../auth/authContext";
import { HeaderButton } from "@/components/headerButton";
import { ContainerStyles } from "@/components/styles/containerStyles";
import { HeaderStyles } from "@/components/styles/headerStyles";

export default function Grupos() {
  const [data, setData] = useState<Grupo[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function checkLogin() {
      const check = await checkIfLogged();
      if (check == false) {
        router.replace("/auth/login");
      }
    }
    checkLogin();
  }, []);
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
    <SafeAreaView>
      <ScrollView>
        <View style={ContainerStyles.centerContainer}>
          <Text style={styles.title}>Grupos</Text>
          <View>
            <View style={HeaderStyles.fixedHeader}>
              <HeaderButton
                text="Criar grupo"
                onClick={() => router.replace("/grupo/criar")}
              />
              <HeaderButton
                text="Recomendações de grupos"
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
                  usuarioCriadorID={grupo.usuariocriadorid}
                />
                <Text>{"\n"}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
