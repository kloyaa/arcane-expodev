import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInput from "@/components/otp";
import useAuthStore from "@/store/auth.store";

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
    <SafeAreaView className="bg-primary h-full">
      <OTPInput onSubmit={handleOTPSubmit} onResend={handleResendOTP} />
    </SafeAreaView>
  );
};

export default otp;
