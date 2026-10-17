import { getUserID } from "@/app/auth/authContext";
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

export async function getAllUsers() {
  const { data, error } = await supabase.from("usuarios").select("*");
  if (error) {
    console.log("Erro ao listar todos os usuarios: " + error);
    return { success: false, error };
  }
  return { success: true, data };
}

// grupo
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
