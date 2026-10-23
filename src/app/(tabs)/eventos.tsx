import { Button } from "@/components/button";
import { SaidaCard } from "@/components/saidaCard";
import { styles } from "@/components/styles";
import {
  getEventsOfGroup,
  getGroupsLocalUserIsMemberInfo,
} from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
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
      var eventosTemp = [];
      for (let index = 0; index < groupsLocalUser.length; index++) {
        const res = await getEventsOfGroup(groupsLocalUser[index].id);
        if (Array.isArray(res.data) && res.data?.length != 0) {
          const eventosGrupo = res.data?.map((evento: Evento) => ({
            ...evento,
            grupo: groupsLocalUser[index],
          }));
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
        {eventos?.map((evento) => (
          <SaidaCard
            titulo={evento.descricao}
            local="teste"
            grupo={evento.grupo.nome}
            key={evento.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
