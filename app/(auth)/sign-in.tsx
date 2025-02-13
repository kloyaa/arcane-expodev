import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { forwardRef, useRef, useState } from "react";
import CustomButton from "@/components/custom-buttom";
import { FormFieldProps, IFormState } from "@/interfaces/form.interface";
import { Link } from "expo-router";
import { CustomInput, CustomObscuredInput } from "@/components/form-field";
import useAuthStore from "@/store/auth.store";
import SafeArea from "@/components/safearea";
import Text from "@/components/text";

const FormFieldForwardRef = forwardRef<TextInput, Omit<FormFieldProps, "ref">>(
  (props, ref) => <CustomInput ref={ref} {...props} />
);

FormFieldForwardRef.displayName = "FormFieldRef";

const SignIn = (): JSX.Element => {
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [form, setForm] = useState<IFormState>({
    username: "",
    password: "",
    isSubmitting: false,
  });

  const { login, error } = useAuthStore();

  const submit = async (): Promise<void> => {
    const identifier = form.username.trim();
    const password = form.password.trim();

    if (identifier === "") {
      return usernameRef.current?.focus();
    }

    if (password === "") {
      return passwordRef.current?.focus();
    }

    const response = await login({
      identifier,
      password,
    });

    if (!response) {
      return usernameRef.current?.focus();
    }
  };

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View className="w-full flex justify-between items-start h-full px-4 py-5">
          <View className="flex justify-start items-start w-full">
            <Text className="text-black dark:text-white text-[24px] text-left font-pregular">
              Login with your <Text className="text-secondary font-psemibold">Hextech</Text>{" "}
              account
            </Text>
            <View className="w-full mt-[30px]">
              <FormFieldForwardRef
                ref={usernameRef}
                title="Username"
                value={form.username}
                placeholder="Enter your Username or Email"
                labelClassName="text-black dark:text-white mb-3 text-[12px]"
                inputClassName="text-black dark:text-white text-sm"
                changeText={(e: string) => {
                  setForm({
                    ...form,
                    username: e,
                  });
                }}
              />
              <CustomObscuredInput
                ref={passwordRef}
                title="Password"
                value={form.password}
                placeholder="Enter your password"
                labelClassName="text-black dark:text-white mb-3 text-[12px]"
                inputClassName="text-black dark:text-white text-sm"
                onChangeText={(e) => {
                  setForm({
                    ...form,
                    password: e,
                  });
                }}
              />
            </View>

            {error && <Text className="text-red-400 text-[12px]">{error}</Text>}
          </View>

          <View className="w-full">
            <CustomButton
              title={"Sign in"}
              containerStyles={styles.customButtonSignInContainerStyles}
              handlePress={submit}
              isLoading={form.isSubmitting}
            />
            <Link href="/sign-up" className="mt-7">
              <Text className="text-black dark:text-white text-[12px] font-pregular mt-7 text-center">
                Don&apos;t have an account?{" "}
                <Text className="text-secondary-dark dark:text-secondary font-psemibold ">Sign up</Text>
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default SignIn;

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
