import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { editarGrupo, getGroup } from "@/lib/databaseHandler";
import * as ImagePicker from "expo-image-picker";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Grupo } from "../../interfaces/grupo";

export default function EditarPerfil() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<Grupo | null>(null);
  const [loading, setLoading] = useState(true);
  const grupoId = Number(id);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const defaultProfilePicture = require("@/assets/images/default_profile_picture.png");
  useEffect(() => {
    async function fetchGroup() {
      const resultado = await getGroup(grupoId);
      if (resultado?.data) {
        setData(resultado.data);
        setNewName(resultado.data.nome);
        setNewDescription(resultado.data.descricao);
      }
    }
    fetchGroup();
  }, [grupoId]);
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
            href={"/(tabs)/grupos"}
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
        <Text>Descrição</Text>
        <TextInput
          multiline
          style={styles.multilineInput}
          value={newDescription}
          onChangeText={setNewDescription}
          numberOfLines={4}
          maxLength={200}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Button
          text="Alterar grupo"
          onClick={() => updateGroup(newName, newDescription, grupoId)}
        />
      </View>
    </View>
  );
}
async function updateGroup(nome: string, description: string, groupId: number) {
  try {
    const result = await editarGrupo(groupId, nome, description);
    if (!result.success) {
      alert("Erro ao editar grupo: " + JSON.stringify(result.error));
      return;
    }

    router.replace("/(tabs)/grupos");
  } catch (e) {
    console.error("Erro no updateGroup:", e);
    alert("Erro inesperado: " + e);
  }
}
