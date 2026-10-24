import { Button } from "@/components/button";
import { SaidaCard } from "@/components/saidaCard";
import { styles } from "@/components/styles";
import {
  getEventsOfGroup,
  getGroupsLocalUserIsMemberInfo,
  getLocal,
} from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Evento } from "../interfaces/evento";
import { Grupo } from "../interfaces/grupo";

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [grupos, setGrupos] = useState<Grupo[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      const groupsLocalUser = await getGroupsLocalUserIsMemberInfo();
      var eventosTemp: any[] = [];
      for (let index = 0; index < groupsLocalUser.length; index++) {
        const res = await getEventsOfGroup(groupsLocalUser[index].id);
        if (Array.isArray(res.data) && res.data?.length != 0) {
          const eventosGrupo = await Promise.all(
            res.data.map(async (evento: Evento) => {
              let local = null;
              if (evento.local) {
                const resLocal = await getLocal(evento.local.localid);
                local = resLocal.data;
              }
              return { ...evento, grupo: groupsLocalUser[index], local };
            }),
          );
          eventosTemp.push(...eventosGrupo);
        }
      }
      setEventos(eventosTemp as any);
      setLoading(false);
    }
    fetchData();
  }, [setEventos]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        text="Criar evento"
        onClick={() => router.push("/eventos/criar")}
      />
      <ScrollView>
        {eventos?.map((evento: any) => (
          <View key={evento.id}>
            <SaidaCard
              titulo={evento.descricao}
              local={evento.local?.nome || "Local não definido"}
              data={evento.datahora || ""}
              grupo={evento.grupo.nome}
              usuarioCriadorID={evento.usuariocriadorid}
              key={evento.id}
              id={evento.id}
            />
            <Text>{"\n"}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
