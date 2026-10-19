import { getUserID } from "@/app/auth/authContext";
import { Grupo } from "@/app/interfaces/grupo";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";
import { supabase } from "./supabaseClient";

// Usuarios
export async function RegisterUser(nome: string, username: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .insert({ nome: nome, username: username })
    .select()
    .single();
  if (error) {
    console.log("Erro ao cadastrar usuario: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function EditUser(
  id: string,
  newName: string,
  username: string,
  fotoperfil: string,
) {
  username = username.replaceAll(" ", "_");
  const { data, error } = await supabase
    .from("usuarios")
    .update({ nome: newName, username: username, fotoperfil: fotoperfil })
    .eq("id", id);
  if (error) {
    console.log("ocorreu um erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function getAllUsers() {
  const { data, error } = await supabase.from("usuarios").select("*");
  if (error) {
    console.log("Erro ao listar todos os usuarios: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}
export async function getUserLoggedInInfo() {
  const USER_ID = await getUserID();
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", USER_ID)
    .single();
  if (error) {
    console.log("Houve um erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}
// grupo
export async function getGroup(grupoId: number) {
  const { data, error } = await supabase
    .from("grupos")
    .select("*")
    .eq("id", grupoId)
    .single();
  if (error) {
    console.log("Erro: " + error);
    return { success: false, error };
  }
  return { data };
}

export async function criarGrupo(nome: string, descricao: string) {
  const USER_ID = await getUserID();

  const { data, error } = await supabase
    .from("grupos")
    .insert({
      nome: nome,
      descricao: descricao,
      usuariocriadorid: USER_ID,
    })
    .select()
    .single();
  if (error) {
    console.log("Ocorreu um erro: " + error);
    return { success: false, error };
  }
  await addUserToGroup(data.id, USER_ID);
  return { success: true, data };
}

export async function addUserToGroup(grupoId: number, userID: string) {
  const { data, error } = await supabase
    .from("fkgrupousuario")
    .insert({
      grupoid: grupoId,
      usuarioid: userID,
    })
    .select()
    .single();
  if (error) {
    console.log("Um erro ocorreu: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function getGroupsLocalUserIsMemberInfo() {
  const USER_ID = await getUserID();

  const { data, error } = await supabase
    .from("fkgrupousuario")
    .select("*")
    .eq("usuarioid", USER_ID);
  if (error) {
    console.log("Houve um erro " + error);
    return [];
  }
  var grupos: Grupo[] = [];
  for (let index = 0; index < data.length; index++) {
    const grupoTemp = await getGroup(data[index].grupoid);
    grupos.push(grupoTemp.data);
  }
  return grupos;
}

export async function editarGrupo(
  ID: number,
  newName: string,
  newDescription: string,
) {
  const { data, error } = await supabase
    .from("grupos")
    .update({ nome: newName, descricao: newDescription })
    .eq("id", ID);
  if (error) {
    console.error("Um erro ocorreu: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

// miscleaneas

export async function uploadProfilePicture(userID: string, localUri: string) {
  const fileName = `${userID}-${Date.now()}.jpg`; // fixo, sem tentar extrair da uri
  const contentType = "image/jpeg";

  let fileData: ArrayBuffer | Blob;

  if (Platform.OS === "web") {
    const response = await fetch(localUri);
    fileData = await response.blob();
  } else {
    const base64 = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    fileData = decode(base64);
  }

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, fileData, { contentType, upsert: true });

  if (error) {
    console.error("Erro no upload:", error);
    return null;
  }

  return fileName;
}
