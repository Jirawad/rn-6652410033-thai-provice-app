import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  //-----------------------------------------
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  //-----------------------------------------
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "SONGKHLA GUIDE",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: "Kanit_700Bold", color: "#fff" },
          headerStyle: {
            backgroundColor: "#1abc9c",
          },
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียดร้าน",
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "Kanit_400Regular", color: "#fff" },
          headerStyle: { backgroundColor: "#4A3B32" },
        }}
      />
    </Stack>
  );
}
