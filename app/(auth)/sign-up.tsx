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

import { images } from "../../constants";
import CustomButton from "@/components/custom-buttom";
import {
  CustomObscuredInputProps,
  FormFieldProps,
  ISignUpFormState,
} from "@/interfaces/form.interface";
import { Link } from "expo-router";
import { CustomInput, CustomObscuredInput } from "@/components/form-field";

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
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [form, setForm] = useState<ISignUpFormState>({
    username: "",
    password: "",
    confirmPassword: "",
    isSubmitting: false,
  });

  const submit = (): void => {
    const username = form.username.trim();
    const password = form.password.trim();
    const confirmPassword = form.confirmPassword.trim();

    if (username === "") {
      return usernameRef.current?.focus();
    }

    if (password === "") {
      return passwordRef.current?.focus();
    }

    if (confirmPassword === "") {
      return confirmPasswordRef.current?.focus();
    }

    if (password !== confirmPassword) {
      return confirmPasswordRef.current?.focus();
    }

    console.log(form);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View className="w-full flex justify-between items-start h-full px-4 py-5">
          <View className="flex justify-start items-start w-full">
            <Image
              source={images.arcaneLogo}
              className="w-[155px] h-[50px] -left-3"
              resizeMode="contain"
            />
            <Text className="text-white font-plight text-[16px] text-center">
              Create your <Text className="text-secondary">Hextech</Text>{" "}
              account
            </Text>
            <View className="w-full mt-[30px]">
              <CustomInputForwardRef
                ref={usernameRef}
                title="Username or Email"
                value={form.username}
                placeholder="Enter your Username or Email"
                changeText={(e: string) => {
                  setForm({
                    ...form,
                    username: e,
                  });
                }}
              />
              <Text className="mt-6 mb-4 text-gray-700 text-sm">
                Use a strong password that is at least 8 characters long and
                includes both uppercase letters and numbers
              </Text>
              <CustomObscuredInputForwardRef
                ref={passwordRef}
                title="Password"
                value={form.password}
                placeholder="Enter your password"
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
                value={form.confirmPassword}
                placeholder="Confirm your password"
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
              title={"Create my account"}
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
