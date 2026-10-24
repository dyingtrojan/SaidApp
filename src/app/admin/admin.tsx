import { getUserID } from "@/app/auth/authContext";
import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { banirUsuario, getAllUsers, podeModerar } from "@/lib/databaseHandler";
import { Link, router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ModeracaoUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userId = await getUserID();
      const permitido = await podeModerar(userId);
      if (!permitido) {
        alert("Você não tem permissão para acessar essa página.");
        router.replace("/(tabs)/perfil");
        return;
      }
      const resultado = await getAllUsers();
      if (resultado.success) setUsuarios(resultado.data || []);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Moderação", headerShown: true }} />
      <Link style={{ fontWeight: "500", fontSize: 20 }} href={"/(tabs)/perfil"}>
        ← Voltar
      </Link>
      <Text>{"\n"}</Text>
      <ScrollView style={{ width: "100%" }}>
        {usuarios.map((usuario) => (
          <View
            key={usuario.id}
            style={{
              borderWidth: 1,
              borderColor: "#666565",
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text>
              {usuario.nome} (@{usuario.username})
            </Text>
            <Button
              text="Banir / Remover conta"
              onClick={async () => {
                const confirmado = confirm(`Remover ${usuario.nome}?`);
                if (!confirmado) return;
                await banirUsuario(usuario.id);
                setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
