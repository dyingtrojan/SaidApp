import { getUserID } from "@/app/auth/authContext";
import { Interesse } from "@/app/interfaces/interesse";
import {
  addUserToGroup,
  getGroupInterests,
  getGroupMembers,
  getInteresse,
  removeMemberFromGroup,
} from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "./button";
import { styles } from "./styles";

type GrupoCardProps = {
  id: number;
  nome: string;
  descricao: string;
  usuarioCriadorID: string;
};

function GroupCreator({ userID = "", usuarioCriadorID = "", groupId = 0 }) {
  if (userID == usuarioCriadorID) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button
          text="Editar esse grupo"
          onClick={() => router.push(`/grupo/editar/${groupId}`)}
        />
        <Text>Você criou esse grupo.</Text>
      </View>
    );
  }
  return null;
}

export function GrupoCard(props: GrupoCardProps) {
  const [user_id, setUserID] = useState("null");
  const [interesses, setInteresses] = useState<Interesse[] | []>([]);
  const [usuariocriadorid, setUsuarioCriadorId] = useState<string | undefined>(
    "",
  );
  const [userIsInGroup, setUserIsInGroup] = useState("Entre no grupo");
  const [members, setMembers] = useState<string[]>([]);
  useEffect(() => {
    async function get_userId() {
      const usId = await getUserID();
      setUserID(usId);
    }
    get_userId();
    async function fetchData() {
      setUsuarioCriadorId(props.usuarioCriadorID);
      const resGrupoInterests = await getGroupInterests(props.id);
      var interestArray: Interesse[] = [];
      const getMembers = await getGroupMembers(props.id);
      if (getMembers.data != undefined) {
        setMembers(getMembers.data?.map((m) => m.usuarioid));
      }
      if (resGrupoInterests) {
        for (
          let index = 1;
          index <= (resGrupoInterests.data?.length as any);
          index++
        ) {
          const interest = await getInteresse(index);
          interestArray.push(interest.data);
        }
        setInteresses(interestArray);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (members.includes(user_id)) {
      setUserIsInGroup("Sair do grupo");
    } else {
      setUserIsInGroup("Entrar no grupo");
    }
  });
  return (
    <View style={styles.grupoCard}>
      <Text style={styles.subtitle}>{props.nome}</Text>
      <Text>{"\n"}</Text>
      <Text>{props.descricao}</Text>
      <Text>{"\n"}</Text>
      <Text>Interesses: </Text>
      <View>
        {interesses.map((interesse) => (
          <Text key={interesse.id}>· {interesse.nome}</Text>
        ))}
      </View>
      <Text>{"\n"}</Text>
      <View>
        <GroupCreator
          userID={user_id}
          usuarioCriadorID={props.usuarioCriadorID}
          groupId={props.id}
        />
        <Text>{"\n"}</Text>
        <Button
          text={userIsInGroup}
          onClick={() => {
            if (userIsInGroup == "Sair do grupo") {
              sairDoGrupo(props.id, user_id);
              setUserIsInGroup("Entrar no grupo");
            } else if (userIsInGroup == "Entrar no grupo") {
              entrarNoGrupo(props.id, user_id);
              setUserIsInGroup("Sair do grupo");
            }
          }}
        />
      </View>
    </View>
  );
}

async function sairDoGrupo(groupId: number, userId: string) {
  const remUser = await removeMemberFromGroup(groupId, userId);
  router.push("/(tabs)/grupos");
}
async function entrarNoGrupo(groupId: number, userId: string) {
  const remUser = await addUserToGroup(groupId, userId);
  router.push("/(tabs)/grupos");
}
