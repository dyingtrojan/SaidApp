import { getUserID } from "@/app/auth/authContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./button";

type SaidaCardProps = {
  id?: number;
  titulo: string;
  local: string;
  grupo: string;
  data: string;
  usuarioCriadorID?: string;
  imagemPath?: string;
};

function formatarData(dataISO: string) {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SaidaCard(props: SaidaCardProps) {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const id = await getUserID();
      setUserID(id);
    }
    fetchUser();
  }, []);

  const dataEvento = new Date(props.data);
  const literalmenteAgora = new Date();
  if (dataEvento < literalmenteAgora) {
    return null;
  }

  const ehCriador =
    userID && props.usuarioCriadorID && userID === props.usuarioCriadorID;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.titulo}</Text>
      <Text>{props.local}</Text>
      <Text>{props.grupo}</Text>
      <Text>{formatarData(props.data || "")}</Text>
      {ehCriador && (
        <Button
          text="Editar evento"
          onClick={() => router.push(`/eventos/editar/${props.id}`)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    borderColor: "#575757",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 600,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
