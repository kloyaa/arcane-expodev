import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { forwardRef, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../../constants";
import CustomButton from "@/components/custom-buttom";
import {
  CustomObscuredInputProps,
  FormFieldProps,
  ISignUpFormState,
} from "@/interfaces/form.interface";
import { Link, router } from "expo-router";
import { CustomInput, CustomObscuredInput } from "@/components/form-field";
import IconButton from "@/components/icon-button";
import useAuthStore from "@/store/auth.store";
import SafeArea from "@/components/safearea";

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

const SignUpPassword = (): JSX.Element => {
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [form, setForm] = useState<ISignUpFormState>({
    password: "",
    confirmPassword: "",
    isSubmitting: false,
  });

  const { state, setState } = useAuthStore();

  const submit = (): void => {
    const password = form.password?.trim();
    const confirmPassword = form.confirmPassword?.trim();
    if (password === "") {
      return passwordRef.current?.focus();
    }

    if (confirmPassword === "") {
      return confirmPasswordRef.current?.focus();
    }

    if (password !== confirmPassword) {
      return confirmPasswordRef.current?.focus();
    }

    setState({
      ...state,
      password,
    })

    router.push("/sign-up-steps/otp");
  };

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View className="w-full flex justify-between items-start h-full px-4 py-5">
          <View className="flex justify-start items-start w-full">
            <View className="w-full mt-[10px]">
              <View className="flex-row gap-5 justify-start w-full mb-5">
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
              <CustomObscuredInputForwardRef
                ref={passwordRef}
                title="Password"
                value={form.password || ""}
                placeholder="Enter your password"
                labelClassName="text-black dark:text-white mb-3 text-[12px]"
                inputClassName="text-black dark:text-white  text-sm"
                allowToggle={true}
                onChangeText={(e) => {
                  setForm({
                    ...form,
                    password: e,
                  });
                }}
              />

              <CustomObscuredInputForwardRef
                ref={confirmPasswordRef}
                title="Confirm"
                value={form.confirmPassword || ""}
                placeholder="Confirm your password"
                labelClassName="text-black dark:text-white mb-3 text-[12px]"
                inputClassName="text-black dark:text-white  text-sm"
                onChangeText={(e) => {
                  setForm({
                    ...form,
                    confirmPassword: e,
                  });
                }}
              />
            </View>
          </View>

          <View className="w-full">
            <CustomButton
              title={"Create Account"}
              containerStyles={styles.customButtonSignInContainerStyles}
              // textStyles={styles.customButtonSignInTextStyles}
              handlePress={submit}
              isLoading={form.isSubmitting}
            />
            <Link href="/sign-in" className="mt-7">
              <Text className="text-black dark:text-white text-[12px] font-pregular mt-7 text-center">
                Already have an account?{" "}
                <Text className="text-secondary-dark dark:text-secondary font-psemibold">Sign in</Text>
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default SignUpPassword;

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
