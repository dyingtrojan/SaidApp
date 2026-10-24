import { GrupoCard } from "@/components/grupoCard";
import { SaidaCard } from "@/components/saidaCard";
import { styles } from "@/components/styles";
import {
  getEventsOfGroup,
  getGroup,
  getGroupsLocalUserIsMemberInfo,
  getGroupsWithInterests,
  getInterestsOfUser,
} from "@/lib/databaseHandler";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { checkIfLogged, getUserID } from "../auth/authContext";
import { Evento } from "../interfaces/evento";
import { Grupo } from "../interfaces/grupo";

export default function TelaInicial() {
  const router = useRouter();
  const [eventos, setEventos] = useState<any[]>([]);
  const [gruposRecomendados, setGruposRecomendados] = useState<Grupo[]>([]);

  useEffect(() => {
    async function checkLogin() {
      const check = await checkIfLogged();
      if (check == false) {
        router.replace("/");
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    async function fetchEventos() {
      const groupsLocalUser = await getGroupsLocalUserIsMemberInfo();
      var eventosTemp: any[] = [];
      for (let index = 0; index < groupsLocalUser.length; index++) {
        const res = await getEventsOfGroup(groupsLocalUser[index].id);
        if (Array.isArray(res.data) && res.data?.length != 0) {
          const eventosGrupo = res.data.map((evento: Evento) => ({
            ...evento,
            grupo: groupsLocalUser[index],
          }));
          eventosTemp.push(...eventosGrupo);
        }
      }
      const agora = new Date();
      const eventosFuturos = eventosTemp.filter(
        (evento) => evento.datahora && new Date(evento.datahora) >= agora,
      );
      setEventos(eventosFuturos);
    }

    async function fetchGruposRecomendados() {
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
      setGruposRecomendados(grupos);
    }

    fetchEventos();
    fetchGruposRecomendados();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ padding: 10 }}>
        <Text style={styles.subtitle}>
          Eventos marcados em grupos que participa
        </Text>
        <Text>{"\n"}</Text>
        <ScrollView horizontal style={styles.sidewaysContainer}>
          {eventos.length === 0 ? (
            <Text>Nenhum evento marcado ainda.</Text>
          ) : (
            eventos.map((evento) => (
              <SaidaCard
                key={evento.id}
                titulo={evento.descricao}
                local={evento.local?.nome || "Local não definido"}
                data={evento.datahora || ""}
                grupo={evento.grupo.nome}
              />
            ))
          )}
        </ScrollView>
        <Text>{"\n"}</Text>
        <Text style={styles.subtitle}>
          Recomendações de grupos para participar
        </Text>
        <Text>{"\n"}</Text>
        {gruposRecomendados.length === 0 ? (
          <Text>Nenhuma recomendação disponível ainda.</Text>
        ) : (
          gruposRecomendados.map((grupo) => (
            <View key={grupo.id}>
              <GrupoCard
                nome={grupo.nome}
                id={grupo.id}
                descricao={grupo.descricao}
                usuarioCriadorID={grupo.usuariocriadorid}
              />
              <Text>{"\n"}</Text>
            </View>
          ))
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
