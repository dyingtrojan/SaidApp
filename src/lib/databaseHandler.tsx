import { getUserID } from "@/app/auth/authContext";
import { Grupo } from "@/app/interfaces/grupo";
import { Interesse } from "@/app/interfaces/interesse";
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

// eventos
export async function createEvent(
  descricao: string,
  grupoId: number,
  usuariocriadorid: string,
) {
  const { data, error } = await supabase
    .from("eventos")
    .insert({
      descricao: descricao,
      usuariocriadorid: usuariocriadorid,
      grupoid: grupoId,
    })
    .select()
    .single();
  if (error) {
    console.log("Houve um error: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function getEventsOfGroup(grupoId: number) {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("grupoid", grupoId);
  if (error) {
    console.log("Erro ao tentar buscar eventos em um grupo: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

// interesse

export async function getInteresse(interestId: number) {
  const { data, error } = await supabase
    .from("interesses")
    .select("*")
    .eq("id", interestId)
    .single();
  if (error) {
    console.log("houve um erro: " + error);
    return { success: false, error };
  }
  return { data };
}

export async function getInterestsOfUser(userId: string) {
  const { data, error } = await supabase
    .from("fkusuariosinteresses")
    .select("*")
    .eq("usuarioid", userId);
  if (error) {
    console.log("houve um erro: " + error);
    return [];
  }
  var interesses: Interesse[] = [];
  for (let index = 0; index < data.length; index++) {
    const interTemp = await getInteresse(data[index].interesseid);
    interesses.push(interTemp.data);
  }
  return interesses;
}

export async function getAllInterests() {
  const { data, error } = await supabase.from("interesses").select("*");
  if (error) {
    console.log("Um erro ocorreu: " + error);
    return { success: false, error };
  }
  return { data };
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

// faça um bagulho que ele primeiro checa os interesses do grupo, apaga os que foram requisitados e adiciona os novos

export async function getGroupInterests(groupId: number) {
  const { data, error } = await supabase
    .from("fkgrupointeresses")
    .select("*")
    .eq("grupoid", groupId);
  if (error) {
    console.log("Houve um erro: " + error);
    return { success: false, error };
  }
  return { data };
}

export async function addInterestsToGroup(
  groupId: number,
  interests: number[],
) {
  const result = await getGroupInterests(groupId);
  if (result.data?.length != 0) {
    const { data, error } = await supabase
      .from("fkgrupointeresses")
      .delete()
      .eq("grupoid", groupId);
  }
  for (let index = 0; index < interests.length; index++) {
    const { error } = await supabase
      .from("fkgrupointeresses")
      .insert({ grupoid: groupId, interesseid: interests[index] });

    if (error) {
      console.log("Um erro ocorreu: " + error);
      return { success: false, error };
    }
  }
  return { success: true };
}
