import { getUserID } from "@/app/auth/authContext";
import { Interesse } from "@/app/interfaces/interesse";
import { getGroupInterests, getInteresse } from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "./button";
import { styles } from "./styles";

type GrupoCardProps = {
  id: number;
  nome: string;
  descricao: string;
  usuarioCriadorID?: string;
};
function GroupCreator({ userID = "", usuarioCriadorID = "", groupId = 0 }) {
  if (userID == usuarioCriadorID) {
    return (
      <View style={styles.container}>
        <Button
          text="Editar grupo"
          onClick={() => router.push(`/grupo/editar/${groupId}`)}
        />
        <Text>Você criou esse grupo.</Text>
      </View>
    );
  }
  return null;
}

export function GrupoCard(props: GrupoCardProps) {
  const [user_id, setUserID] = useState("");
  const [interesses, setInteresses] = useState<Interesse[] | []>([]);
  useEffect(() => {
    async function get_userId() {
      setUserID(await getUserID());
    }
  });
  useEffect(() => {
    async function fetchData() {
      const resGrupoInterests = await getGroupInterests(props.id);
      var interestArray: Interesse[] = [];

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
  return (
    <View style={styles.grupoCard}>
      <Text style={styles.subtitle}>{props.nome}</Text>
      <Text>{"\n"}</Text>
      <Text>{props.descricao}</Text>
      <Text>{"\n"}</Text>
      <Text>Interesses: </Text>
      <View>
        {interesses.map((interesse) => (
          <Text key={props.id}>· {interesse.nome}</Text>
        ))}
      </View>
      <Text>{"\n"}</Text>
      <GroupCreator
        userID={user_id}
        usuarioCriadorID={props.usuarioCriadorID}
        groupId={props.id}
      />
    </View>
  );
}
