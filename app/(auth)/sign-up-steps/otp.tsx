import React from "react";
import OTPInput from "@/components/otp";
import useAuthStore from "@/store/auth.store";
import SafeArea from "@/components/safearea";
import { View } from "react-native";

const otp = () => {
  const { clearCredenials, registration } = useAuthStore();

  const handleOTPSubmit = async (otp: string) => {
    console.log("Entered OTP:", otp);

    try {
      await registration();

      // Clear credentials if enrollment is successful
      clearCredenials();
    } catch (error) {
      console.log(error);
    }
    // Call API to verify OTP
  };

  const handleResendOTP = () => {
    console.log("Resend OTP triggered");
    // Call API to resend OTP
  };

  return (
    <SafeArea props={{ className: "h-full bg-white dark:bg-gray-800" }}>
      <View className="flex flex-col justify-center items-center mt-[25vh]">
        <OTPInput
          inputClassName="w-12 h-12 border-[0.5px] text-black dark:text-white dark:border-secondary-dark text-center text-lg rounded-md dark:focus:border-secondary"
          labelClassName="text-lg font-pbold dark:text-white mb-6 text-[22px]"
          timerClassName="text-black dark:text-secondary-dark mt-14"
          otpLength={6}
          onSubmit={handleOTPSubmit}
          onResend={handleResendOTP} />
      </View>
    </SafeArea>
  );
};

export default otp;
