import { getUserID } from "@/app/auth/authContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Divider } from '@rneui/themed';
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./button";
import { Colors } from "./colors";

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

function monthNumberToShortString(dataISO: string){
  const months = [
    "JAN", "FER", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEC"
  ]
  if (!dataISO) return "";
  const data = new Date(dataISO);
  return months[data.getMonth() - 1]

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
      <View style={styles.topPart}>
        <View style={styles.dateBox}>
          <Text style={{flexShrink: 1, fontSize: 24, fontWeight: "bold"}}>{formatarData(props.data || "").slice(0,2)}</Text>
          <Text style={{flexShrink: 1}}>{monthNumberToShortString(props.data || "")}</Text>
          <Text style={{flexShrink: 1}}>{formatarData(props.data || "").slice(6,10)}</Text>
        </View>
        <View style={{justifyContent: "center", alignContent: "center", minHeight: "auto", width: "100%"}}>
          <Text style={styles.title}>{props.titulo.length > 33 ? props.titulo.slice(0, 32) + "..." : props.titulo}</Text>
        </View>
      </View>
      <Text style={{flexShrink: 1}}>{props.local}</Text>
      <Text style={{flexShrink: 1}}>{props.grupo}</Text>
      {ehCriador && (
        <View style={{alignSelf: "center", justifyContent: "center", flex: 1}}>
          <Button
          text="Editar evento"
          onClick={() => router.push(`/eventos/editar/${props.id}`)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    borderColor: Colors.clay,
    gap: 20,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    margin: 10,
    width: 300,
    maxHeight: "auto"
  },
  topPart: {
    flexDirection: "row",
    gap: 5,
  },
  title: {
    width: "70%",
    flexGrow: 1,
    fontFamily:"Quicksand_700Bold",
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
  },
  dateBox: {
    backgroundColor: Colors.cream,
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
    width: "30%",
    height: "auto",
    maxHeight: 80,
    overflow: "hidden"
  }
});
