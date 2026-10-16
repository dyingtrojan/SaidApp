import { createContext } from "react";
import { supabase } from "../../lib/supabaseClient";

const authContext = createContext(null);

export async function signUpNewUser(
  nome: string,
  email: string,
  password: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { nome: name },
    },
  });
  if (error) {
    console.log("Ocorreu um erro ao criar a conta: " + error);
    return { success: false, error };
  }
  await signInWithEmail(email, password);
}
export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  window.location.href = "../telaInicial";
}
