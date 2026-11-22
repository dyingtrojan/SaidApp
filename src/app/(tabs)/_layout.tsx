import { Colors } from "@/components/colors";
import { Quicksand_400Regular, Quicksand_600SemiBold, Quicksand_700Bold, useFonts } from "@expo-google-fonts/quicksand";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });
  
  if (!fontsLoaded) return null;
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicial",
          animation: "shift",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={Colors.darkTeal}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="grupos"
        options={{
          title: "Grupos",
          animation: "shift",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={size}
              color={Colors.darkTeal}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="eventos"
        options={{
          title: "Eventos",
          animation: "shift",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={Colors.darkTeal}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="amizades"
        options={{
          title: "Amizades",
          animation: "shift",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={Colors.darkTeal}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          animation: "shift",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={Colors.darkTeal}
            />
          ),
        }}
      />
    </Tabs>
  );
}
