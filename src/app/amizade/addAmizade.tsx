import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { UserCard } from "@/components/userCard";
import {
  addFriendship,
  getUserByHandle,
  getUserFriendship,
} from "@/lib/databaseHandler";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserID } from "../auth/authContext";
import { Amizade } from "../interfaces/amizade";
import { Usuarios } from "../interfaces/usuarios";

async function getUsers(handle: string) {
  if (handle == "") {
    return [];
  }
  handle = handle.replaceAll("@", "");
  const USER_ID = await getUserID();
  const res = await getUserByHandle(handle);
  const userFriendships = await getUserFriendship(USER_ID);
  const userSearch = res.data as Usuarios[];

  const friendIds = new Set(
    userFriendships.map((f: Amizade) =>
      f.usuario1id === USER_ID ? f.usuario2id : f.usuario1id,
    ),
  );

  const resultado = userSearch.filter((u) => !friendIds.has(u.id));

  return resultado;
}

export default function AddAmizade() {
  const [anotherUser, setAnotherUser] = useState("");
  const [usuarios, setUsuarios] = useState<Usuarios[] | []>([]);
  return (
    <SafeAreaView style={styles.genericContainer}>
      <View style={styles.header}>
        <Link
          style={{ fontWeight: "500", fontSize: 20 }}
          href={"/(tabs)/amizades"}
        >
          ← Voltar
        </Link>
        <Text style={styles.title}>Amizades</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome de usuario (@nome_de_usuario)"
          defaultValue={anotherUser}
          onChangeText={async (userhandle) =>
            setUsuarios(await getUsers(userhandle))
          }
        ></TextInput>
      </View>
      <Text>{"\n"}</Text>
      <ScrollView>
        {usuarios.map((usuario) => (
          <View
            key={usuario.id}
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <UserCard
              key={usuario.id}
              id={usuario.id}
              nome={usuario.nome}
              username={usuario.username}
              fotoperfil={usuario.fotoperfil}
            />
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Button
                text="Pedir solicitação"
                onClick={() => sendFrienshipRequest(usuario.id)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

async function sendFrienshipRequest(anotherUserId: string) {
  const res = await addFriendship(anotherUserId);
  router.push("/(tabs)/amizades");
}
