import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from '../constants';

import { router } from "expo-router";
import CustomButton from "@/components/custom-buttom";

export default function App(): JSX.Element {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
      >
        <View className="w-full flex justify-between items-center h-full px-4 py-5">
          <View className="flex justify-center items-center w-full">
            <Image
              source={images.arcaneLogo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-white font-pbold text-3xl text-center">
                Discover Endless Possibilities with our new{" "}
                <Text className="text-secondary">Hextech</Text>
              </Text>
            </View>
            <Text className="text-[12px] font-pregular text-gray-100 mt-7 text-center">
              Where necessity is the mother of innovation
            </Text>
          </View>

          <View className="w-full flex justify-center items-center">
            <CustomButton
              title={"Get started"}
              containerStyles={styles.customButtonSignInContainerStyles}
              textStyles={styles.customButtonSignInTextStyles}
              handlePress={() => {
                router.push("/sign-in");
              }}
            />
            <CustomButton
              title={"Don't have an account?"}
              textStyles={styles.customButtonSignUpTextStyles}
              containerStyles={styles.customButtonSignUpContainerStyles}
              handlePress={() => {
                router.push("/sign-up");
              }}
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
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
