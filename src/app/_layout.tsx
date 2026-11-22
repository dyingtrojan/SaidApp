import { Stack } from "expo-router";
import { useFonts, Quicksand_400Regular, Quicksand_600SemiBold, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
