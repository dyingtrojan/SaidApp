import { getUserID } from "@/app/auth/authContext";
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
  useEffect(() => {
    async function get_userId() {
      setUserID(await getUserID());
    }
  });
  return (
    <View style={styles.grupoCard}>
      <Text style={styles.subtitle}>{props.nome}</Text>
      <Text>{props.descricao}</Text>
      <Text>{"\n"}</Text>
      <GroupCreator
        userID={user_id}
        usuarioCriadorID={props.usuarioCriadorID}
        groupId={props.id}
      />
    </View>
  );
}
