import { RegisterUser } from "@/lib/databaseHandler";
import { router } from "expo-router";
import { createContext } from "react";
import { supabase } from "../../lib/supabaseClient";

const authContext = createContext(null);

export async function signUpNewUser(
  nome: string,
  email: string,
  password: string,
  username: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.log("Ocorreu um erro ao criar a conta: " + error);
    return { success: false, error };
  }
  await signInWithEmail(email, password);
  await RegisterUser(nome, username);
  return { success: true, data };
}
export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log("Um erro ocorreu: " + error);
    return { success: false, error };
  }
  return { success: true };
}

export async function checkIfLogged() {
  const { data } = await supabase.auth.getSession();
  if (data.session == null) {
    router.replace("/");
    return false;
  } else {
    return true;
  }
}

export async function getUserID(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const user_id = data.session?.user.id;
  if (!user_id) {
    throw new Error("Usuario não está autenticado.");
  }
  return user_id;
}
