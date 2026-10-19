import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicial" }} />
      <Tabs.Screen name="grupos" options={{ title: "Grupos" }} />
      <Tabs.Screen name="eventos" options={{ title: "Eventos" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
