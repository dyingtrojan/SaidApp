import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { UserCard } from "@/components/userCard";
import {
  acceptFriendship,
  getUserById,
  getUserFriendship,
  removeFriendship,
} from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserID } from "../auth/authContext";
import { Amizade } from "../interfaces/amizade";
import { Usuarios } from "../interfaces/usuarios";

export default function Amizades() {
  const [amizades, setAmizades] = useState<Amizade[]>([]);
  const [amigos, setAmigos] = useState<Usuarios[]>([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const USER_ID = await getUserID();
      const res = (await getUserFriendship(USER_ID)) as Amizade[];
      setAmizades(res);
      var tempAmigos = [];
      for (let index = 0; index < res.length; index++) {
        const usuario1id = res[index].usuario1id;
        const usuario2id = res[index].usuario2id;
        const res1 = await getUserById(res[index].usuario1id);
        const res2 = await getUserById(res[index].usuario2id);
        var tempUser: Usuarios;
        if (usuario1id == USER_ID) {
          tempUser = res2.data;
          tempAmigos.push(tempUser);
        } else if (usuario2id == USER_ID) {
          tempUser = res1.data;
          tempAmigos.push(tempUser);
        }
      }
      setAmigos(tempAmigos);
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.genericContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Amizades</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            text="Adicionar uma amizade"
            onClick={() => router.push("/amizade/addAmizade")}
          />
          <View style={{ flexDirection: "row-reverse" }}>
            <Button text="Atualizar" onClick={() => location.reload()} />
          </View>
        </View>
      </View>
      <ScrollView>
        {amigos.map((usuario) => (
          <View key={usuario.id} style={{ flexDirection: "column" }}>
            <UserCard
              username={usuario.username}
              nome={usuario.nome}
              id={usuario.id}
              fotoperfil={usuario.fotoperfil}
            />
            <Text>{"\n"}</Text>
            <Button
              text={
                amizades[amigos.indexOf(usuario)].acceptance_level == 1
                  ? "Sair da amizade"
                  : amizades[amigos.indexOf(usuario)].usuario1id == usuario.id
                    ? "Aceite a solicitação."
                    : "Esperando solicitação..."
              }
              onClick={async () =>
                updateFriendship(
                  amizades[amigos.indexOf(usuario)].usuario1id,
                  amizades[amigos.indexOf(usuario)].usuario2id,
                  amizades[amigos.indexOf(usuario)].acceptance_level,
                )
              }
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

async function updateFriendship(
  user1Id: string,
  user2Id: string,
  acceptance_level: number,
) {
  const USER_ID = await getUserID();
  if (acceptance_level == 0) {
    if (user1Id != USER_ID) {
      acceptFriendship(user1Id, user2Id);
    }
  } else if (acceptance_level == 1) {
    removeFriendship(user1Id, user2Id);
    router.reload();
  }
}
