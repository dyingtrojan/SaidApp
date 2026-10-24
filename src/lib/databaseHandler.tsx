import { getUserID } from "@/app/auth/authContext";
import { Grupo } from "@/app/interfaces/grupo";
import { Interesse } from "@/app/interfaces/interesse";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";
import { supabase } from "./supabaseClient";

// Usuarios
export async function getUserByHandle(handle: string) {
  const USER_ID = await getUserID();
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .ilike("username", `%${handle}%`)
    .neq("id", USER_ID)
    .limit(20);
  if (error) {
    console.log("Erro ao buscar usuario pelo nome de usuario: " + error);
    return { success: false, error };
  }
  return { data };
}

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
  username = username.replaceAll("@", "");
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

export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    console.log("Houve um erro: " + error);
    return { success: false, error };
  }
  return { data };
}

// grupo

export async function deleteGroup(groupId: number) {
  const del_mem_list = await removeAllMembersFromGroup(groupId);
  const del_int_list = await removeAllInterestsFromGroup(groupId);
  const { data, error } = await supabase
    .from("grupos")
    .delete()
    .eq("id", groupId)
    .select("*");
  if (error) {
    console.log("Erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function removeAllMembersFromGroup(groupId: number) {
  const { data, error } = await supabase
    .from("fkgrupousuario")
    .delete()
    .eq("grupoid", groupId)
    .select("*");
  if (error) {
    console.log("Erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function removeAllInterestsFromGroup(groupId: number) {
  const { data, error } = await supabase
    .from("fkgrupointeresses")
    .delete()
    .eq("grupoid", groupId)
    .select("*");
  if (error) {
    console.log("Erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function removeMemberFromGroup(groupId: number, userId: string) {
  const { data, error } = await supabase
    .from("fkgrupousuario")
    .delete()
    .eq("grupoid", groupId)
    .eq("usuarioid", userId);
  if (error) {
    return { error };
  }
  return { data };
}

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
export async function getGroupMembers(groupId: number) {
  const { data, error } = await supabase
    .from("fkgrupousuario")
    .select("usuarioid")
    .eq("grupoid", groupId);
  if (error) {
    console.log("erro: " + error);
    return {};
  }
  return { data };
}

// moderadores + admin
export async function isModerador(userId: string) {
  const { data } = await supabase
    .from("moderadores")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
  return !!data;
}

export async function isAdministrador(userId: string) {
  const { data } = await supabase
    .from("administradores")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
  return !!data;
}

export async function podeModerar(userId: string) {
  return (await isModerador(userId)) || (await isAdministrador(userId));
}

export async function banirUsuario(userId: string) {
  // limpa relações primeiro pra não dar erro de FK
  await supabase.from("fkgrupousuario").delete().eq("usuarioid", userId);
  await supabase.from("fkusuariosinteresses").delete().eq("usuarioid", userId);
  await supabase
    .from("amizades")
    .delete()
    .or(`usuario1id.eq.${userId},usuario2id.eq.${userId}`);

  const { data, error } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", userId)
    .select();
  if (error) {
    console.log("Erro ao banir usuario: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

// eventos
export async function createEvent(
  descricao: string,
  grupoId: number,
  usuariocriadorid: string,
  dataHora: string,
  localid: number,
) {
  const { data, error } = await supabase
    .from("eventos")
    .insert({
      descricao: descricao,
      usuariocriadorid: usuariocriadorid,
      grupoid: grupoId,
      datahora: dataHora,
      localid: localid,
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
export async function deleteEvent(eventoId: number) {
  const { data, error } = await supabase
    .from("eventos")
    .delete()
    .eq("id", eventoId)
    .select();
  if (error) {
    console.log("Erro ao deletar evento: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}
export async function getEvento(eventoId: number) {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("id", eventoId)
    .single();
  if (error) {
    console.log("Erro ao buscar evento: " + error);
    return { success: false, error };
  }
  return { data };
}

export async function editEvent(
  eventoID: number,
  descricao: string,
  grupoId: number,
  usuariocriadorid: string,
  dataHora: string,
) {
  const { data, error } = await supabase
    .from("eventos")
    .update({
      descricao: descricao,
      usuariocriadorid: usuariocriadorid,
      grupoid: grupoId,
      datahora: dataHora,
    })
    .eq("id", eventoID);
  if (error) {
    console.log("Houve um error: " + error);
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
export async function addInterestOfUser(interesseid: number) {
  const USER_ID = await getUserID();
  const { data, error } = await supabase
    .from("fkusuariosinteresses")
    .insert({ usuarioid: USER_ID, interesseid: interesseid });
  if (error) {
    console.log("ocorreu um erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function deleteInterestOfUser(interesseid: number) {
  const USER_ID = await getUserID();
  const { data, error } = await supabase
    .from("fkusuariosinteresses")
    .delete()
    .eq("interesseid", interesseid)
    .eq("usuarioid", USER_ID);
  if (error) {
    console.log("ocorreu um erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function getAllInterests() {
  const { data, error } = await supabase.from("interesses").select("*");
  if (error) {
    console.log("Um erro ocorreu: " + error);
    return { success: false, error };
  }
  return { data };
}

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

export async function getGroupsWithInterests(interestsID: Interesse[]) {
  var groupsArray = [];
  for (let index = 0; index < interestsID.length; index++) {
    const { data, error } = await supabase
      .from("fkgrupointeresses")
      .select("*")
      .eq("interesseid", interestsID[index].id)
      .limit(20);
    if (error) {
      console.log("Erro: " + error);
      return [];
    }
    groupsArray.push(data);
  }
  return groupsArray;
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

// amizades
export async function addFriendship(anotherUser: string) {
  const USER_ID = await getUserID();
  const { data, error } = await supabase.from("amizades").insert({
    usuario1id: USER_ID,
    usuario2id: anotherUser,
    acceptance_level: 0,
  });
  if (error) {
    console.log("erro: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function getUserFriendship(userID: string) {
  const { data, error } = await supabase
    .from("amizades")
    .select("*")
    .or(`usuario1id.eq.${userID}, usuario2id.eq.${userID}`);
  if (error) {
    console.log("ocorreu um erro: " + error);
    return [];
  }
  return data;
}

export async function acceptFriendship(user1Id: string, user2Id: string) {
  const { data, error } = await supabase
    .from("amizades")
    .update({ usuario1id: user1Id, usuario2id: user2Id, acceptance_level: 1 })
    .eq("usuario1id", user1Id)
    .eq("usuario2id", user2Id)
    .select("*");
  if (error) {
    console.log(error);
    return error;
  }
  return data;
}
export async function removeFriendship(user1Id: string, user2Id: string) {
  const { data, error } = await supabase
    .from("amizades")
    .delete()
    .eq("usuario1id", user1Id)
    .eq("usuario2id", user2Id)
    .select("*");
  if (error) {
    console.log(error);
    return error;
  }
  return data;
}

// locais
export async function getLocal(localId: number) {
  const { data, error } = await supabase
    .from("locais")
    .select("*")
    .eq("id", localId)
    .single();
  if (error) {
    console.log("Erro ao buscar local: " + error);
    return { success: false, error };
  }
  return { data };
}

export async function criarLocal(nome: string, descricao: string) {
  const { data, error } = await supabase
    .from("locais")
    .insert({ nome: nome, descricao: descricao })
    .select()
    .single();
  if (error) {
    console.log("Erro ao criar local: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function getLocais() {
  const { data, error } = await supabase.from("locais").select("*");
  if (error) {
    console.log("Erro ao listar locais: " + error);
    return { success: false, error };
  }
  return { data };
}

export async function deleteLocal(localId: number) {
  const { data, error } = await supabase
    .from("locais")
    .delete()
    .eq("id", localId)
    .select();
  if (error) {
    console.log("Erro ao deletar local: " + error);
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
