import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { UserCard } from "@/components/userCard";
import { getUserById, getUserFriendship } from "@/lib/databaseHandler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserID } from "../auth/authContext";
import { Amizade } from "../interfaces/amizade";
import { Usuarios } from "../interfaces/usuarios";

export default function Amizades() {
  const [amizades, setAmizades] = useState<Amizade[]>([]);
  const [amigos, setAmigos] = useState<Usuarios[]>([]);
  useEffect(() => {
    async function fetchData() {
      const USER_ID = await getUserID();
      const res = await getUserFriendship(USER_ID);
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
        <Button
          text="Adicionar uma amizade"
          onClick={() => router.push("/amizade/addAmizade")}
        />
      </View>
      <View>
        {amigos.map((usuario) => (
          <UserCard
            key={usuario.id}
            id={usuario.id}
            nome={usuario.nome}
            username={usuario.username}
            fotoperfil={usuario.fotoperfil}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
