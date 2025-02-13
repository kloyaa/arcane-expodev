import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface OTPInputProps {
  otpLength?: number;
  onSubmit: (otp: string) => void;
  onResend?: () => void;
  title?: string;
  inputClassName?: string;
  labelClassName?: string;
  timerClassName?: string
}

const OTPInput: React.FC<OTPInputProps> = ({
  otpLength = 6,
  onSubmit,
  onResend,
  title = "Enter OTP",
  inputClassName,
  labelClassName,
  timerClassName
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""));
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      inputs.current[index + 1]?.focus();
    }

    const fullOTP = newOtp.join("");
    if (fullOTP.length === otpLength) {
      onSubmit(fullOTP); // Auto-submit OTP when all digits are filled
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current input first
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If empty, move focus to previous input and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = () => {
    if (onResend) {
      setTimer(30);
      onResend();
    }
  };

  return (
    <View className="flex items-center justify-center p-5">
      <Text className={labelClassName}>{title}</Text>
      <View className="flex-row mb-5 gap-3">
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref!)}
            className={inputClassName}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <TouchableOpacity
        className="mt-3"
        onPress={handleResend}
        disabled={timer > 0}
      >
        <Text className={`${timerClassName} ${timer > 0 ? "opacity-30" : "opacity-100"}`}>
          {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPInput;
