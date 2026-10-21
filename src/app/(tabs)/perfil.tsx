import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import {
  getInterestsOfUser,
  getUserLoggedInInfo
} from "@/lib/databaseHandler";
import { supabase } from "@/lib/supabaseClient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { logOut } from "../auth/authContext";
import { Interesse } from "../interfaces/interesse";
import { Usuarios } from "../interfaces/usuarios";

export default function Perfil() {
  const defaultProfilePicture = require("@/assets/images/default_profile_picture.png");
  const [data, setData] = useState<Usuarios | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [interesses, setInteresses] = useState<Interesse[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      // pegar info do usuario
      const resultado = await getUserLoggedInInfo();
      if (resultado && !resultado.error) {
        const usuario = resultado.data as Usuarios;
        setData(usuario);

        if (usuario.fotoperfil) {
          const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(usuario.fotoperfil);
          setImage(urlData.publicUrl);
        }
      }

      // pegar interesses do usuario
      try {
        const resInteresses = await getInterestsOfUser(resultado.data.id);
        setInteresses(resInteresses);
      } catch (error) {
        console.log("houve um erro: " + error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <View style={styles.genericContainer}>
      <View style={styles.trueHeader}>
        <View>
          <Image
            source={image ? { uri: image } : defaultProfilePicture}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={styles.title}>{data?.nome}</Text>
          <Text style={styles.subtitle}>@{data?.username}</Text>
        </View>
      </View>
      <View style={styles.buttonProfileEdit}>
        <Button
          text="Editar perfil"
          onClick={() => router.replace("/perfil/editar")}
        />
        <Button text="Sair" onClick={() => logOutofAccount()} />
      </View>
      <View style={{ flex: 5, padding: 20 }}>
        <Text style={styles.subtitle}>Interesses</Text>
        {interesses?.map((interesse) => (
          <Text key={interesse.id}>· {interesse.nome}</Text>
        ))}
      </View>
    </View>
  );
}

async function logOutofAccount() {
  await logOut();
  router.replace("/auth/login");
}
