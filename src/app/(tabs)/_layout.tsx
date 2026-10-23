import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Inicial", animation: "shift" }}
      />
      <Tabs.Screen
        name="grupos"
        options={{ title: "Grupos", animation: "shift" }}
      />
      <Tabs.Screen
        name="eventos"
        options={{ title: "Eventos", animation: "shift" }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: "Perfil", animation: "shift" }}
      />
      <Tabs.Screen
        name="amizades"
        options={{ title: "Amizades", animation: "shift" }}
      />
    </Tabs>
  );
}
