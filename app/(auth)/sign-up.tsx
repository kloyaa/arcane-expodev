import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom-buttom";
import {
  CustomObscuredInputProps,
  FormFieldProps,
  ISignUpFormState,
} from "@/interfaces/form.interface";
import { Link } from "expo-router";
import { CustomInput, CustomObscuredInput } from "@/components/form-field";
import { router } from "expo-router";
import IconButton from "@/components/icon-button";
import useAuthStore from "@/store/auth.store";

const CustomInputForwardRef = forwardRef<
  TextInput,
  Omit<FormFieldProps, "ref">
>((props, ref) => <CustomInput ref={ref} {...props} />);

const CustomObscuredInputForwardRef = forwardRef<
  TextInput,
  Omit<CustomObscuredInputProps, "ref">
>((props, ref) => <CustomObscuredInput ref={ref} {...props} />);

CustomInputForwardRef.displayName = "CustomInputForwardRef";
CustomObscuredInputForwardRef.displayName = "CustomObscuredInputForwardRef";

const SignUp = (): JSX.Element => {
  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  // Store
  const { state, setState, getState } = useAuthStore();

  const [form, setForm] = useState<ISignUpFormState>({
    email: "",
    username: "",
  });

  const submit = (): void => {
    const email = form.email?.trim();
    const username = form.username?.trim();
    if (email === "") {
      return emailRef.current?.focus();
    }

    if (username === "") {
      return usernameRef.current?.focus();
    }

    setState({
      ...state,
      email,
      username,
    });

    router.push("/sign-up-steps/password");
  };

  const retrievePreviousInputs = () => {
    const previousInputs = getState();

    if(previousInputs) {
      setForm({
        ...form,
        email: previousInputs.email || "",
        username: previousInputs.username || ""
      });
    }
  };

  useEffect(() => {
    retrievePreviousInputs();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View className="w-full flex justify-between items-start h-full px-4 py-5">
          <View className="flex justify-start items-start w-full mt-[10px]">
            <View className="flex-row gap-5 justify-start w-full  mb-5">
              <IconButton
                name="arrow-back-outline"
                className="mb-5"
                onPress={() => {
                  router.back();
                }}
              />
              <Text className="text-gray-400 font-pregular text-2xl text-center">
                Sign Up
              </Text>
            </View>
            <View className="w-full mt-[30px]">
              <CustomInputForwardRef
                ref={emailRef}
                title="Email"
                value={form.email || ""}
                placeholder="Enter your Email"
                changeText={(e: string) => {
                  setForm({
                    ...form,
                    email: e,
                  });
                }}
              />
              <CustomInputForwardRef
                ref={usernameRef}
                title="Username"
                value={form.username || ""}
                placeholder="Enter your Username"
                changeText={(e: string) => {
                  setForm({
                    ...form,
                    username: e,
                  });
                }}
              />
            </View>
          </View>

          <View className="w-full">
            <CustomButton
              title={"Continue"}
              containerStyles={styles.customButtonSignInContainerStyles}
              textStyles={styles.customButtonSignInTextStyles}
              handlePress={submit}
              isLoading={form.isSubmitting}
            />
            <Link href="/sign-in" className="mt-7">
              <Text className="text-[12px] font-pregular text-gray-100 mt-7 text-center">
                Already have an account?{" "}
                <Text className="text-secondary font-psemibold">Sign in</Text>
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: "100%",
  },
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
});
