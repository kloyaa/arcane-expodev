import { View, ScrollView, Image, Text, StyleSheet, Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { router } from "expo-router";
import CustomButton from "@/components/custom-buttom";
// import { useTheme } from "@/context/themeContext";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import SafeArea from "@/components/safearea";

export default function App(): JSX.Element {
  const { setColorScheme, colorScheme: systemColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark' || false); // Initialize with system or default

  useEffect(() => {
    setColorScheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, setColorScheme]);

  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => !prevMode); // Simple toggle
  };

  return (
    <SafeArea>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
      >
        <View className="w-full flex-row justify-end">
          <ThemeToggle onToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        </View>

        <View className="w-full flex-col justify-between h-[80vh]">
          <View>
            <Text className="font-pbold text-7xl text-black dark:text-white">
              Discover Endless Possibilities with our new
              <Text className="text-secondary">{" "}Hextech</Text>
            </Text>
            <Text className="text-3xl font-pregular  text-black dark:text-white">
              Where necessity is the mother of innovation
            </Text>
          </View>

          <View className="w-full">
            <CustomButton
              title={"Sign in"}
              containerStyles={styles.customButtonSignInContainerStyles}
              textClassName="text-black dark:text-orange-50"
              handlePress={() => {
                router.push("/firebase-pushnotification");
              }}
            />
            <CustomButton
              title={"Don't have an account?"}
              containerStyles={styles.customButtonSignUpContainerStyles}
              textClassName="text-black dark:text-white"
              handlePress={() => {
                router.push("/sign-up");
              }}
            />
          </View>
        </View>
      </ScrollView >
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeArea >
  );
}

const styles = StyleSheet.create({
  customButtonSignInContainerStyles: {
    width: "100%",
  },
  customButtonSignInTextStyles: {
    fontSize: 14,
  },
  customButtonSignUpContainerStyles: {
    backgroundColor: "transparent",
    width: "100%",
  },
  customButtonSignUpTextStyles: {
    color: "#2c2c42",
    fontSize: 14,
    fontWeight: "400",
  },
  scrollViewContentContainerStyle: {
    height: "100%",
  },
});
