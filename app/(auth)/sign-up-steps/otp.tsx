import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useEnrollmentStore from "@/store/enrollment.store";
import OTPInput from "@/components/otp";

const otp = () => {
  const { clearCredenials, enroll } = useEnrollmentStore();

  const handleOTPSubmit = async (otp: string) => {
    console.log("Entered OTP:", otp);

    try {
      await enroll();

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

  const handleEnroll = async () => {
    await enroll();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <OTPInput onSubmit={handleOTPSubmit} onResend={handleResendOTP} />
    </SafeAreaView>
  );
};

export default otp;
