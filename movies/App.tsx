import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { Text, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import Tabs from "./navigation/Tabs";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([
    /* require('path/to/other.png') */
  ]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);
  const isDark = useColorScheme() === "dark";
  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
