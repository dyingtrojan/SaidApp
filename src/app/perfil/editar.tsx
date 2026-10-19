import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import {
  EditUser,
  getUserLoggedInInfo,
  uploadProfilePicture,
} from "@/lib/databaseHandler";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { getUserID } from "../auth/authContext";
import { Usuarios } from "../interfaces/usuarios";

export default function EditarPerfil() {
  const [data, setData] = useState<Usuarios | null>(null);
  const [loading, setLoading] = useState(true);

  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const defaultProfilePicture = require("@/assets/images/default_profile_picture.png");
  useEffect(() => {
    async function fetchData() {
      const resultado = await getUserLoggedInInfo();

      if (resultado && !resultado.error) {
        const usuario = resultado.data as Usuarios;
        setData(usuario);
        setNewName(usuario.nome || "");
        setNewUserName(usuario.username || "");
      }
      setLoading(false);
    }

    fetchData();
  }, []);
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access the media library is required.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <View style={styles.header}>
          <Link
            style={{ fontWeight: "500", fontSize: 20 }}
            href={"/(tabs)/perfil"}
          >
            ← Voltar
          </Link>
          <Text>{"\n"}</Text>
        </View>
        <Text>Nome</Text>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Nome de Usuario</Text>
        <TextInput
          style={styles.input}
          value={newUserName}
          onChangeText={setNewUserName}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Foto de perfil</Text>
        <Image
          source={image ? { uri: image } : defaultProfilePicture}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Button
          text="Altere sua foto de perfil aqui"
          onClick={() => pickImage()}
        />
        <Button
          text="Alterar perfil"
          onClick={() =>
            updateProfile(newName, newUserName, image || "", data?.id)
          }
        />
      </View>
    </View>
  );
}
async function updateProfile(
  nome: string,
  username: string,
  localUri: string,
  userID?: string,
) {
  try {
    userID = await getUserID();

    let filename: string | null = null;
    if (localUri) {
      filename = await uploadProfilePicture(userID, localUri);
      if (!filename) {
        alert("Erro ao enviar a foto. Perfil não foi salvo.");
        return;
      }
    }

    const result = await EditUser(userID, nome, username, filename || "");
    if (!result.success) {
      alert("Erro ao salvar perfil: " + JSON.stringify(result.error));
      return;
    }

    router.replace("/(tabs)/perfil");
  } catch (e) {
    console.error("Erro no updateProfile:", e);
    alert("Erro inesperado: " + e);
  }
}
