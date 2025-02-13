import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { forwardRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; // Install if not available
import {
  CustomObscuredInputProps,
  FormFieldProps,
} from "@/interfaces/form.interface";

// Define the props interface

const CustomInput = forwardRef<TextInput, FormFieldProps>((props, ref) => {
  // Correct type definition
  return (
    <View style={[styles.container, props.containerStyles]}>
      <Text className={props.labelClassName}>{props.title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref} // Correct ref forwarding
          className={props.inputClassName}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#ccc"
          onChangeText={props.changeText}
          textContentType="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
});

const CustomObscuredInput = forwardRef<TextInput, CustomObscuredInputProps>(
  (props, ref) => {
    const [toggle, setToggle] = useState(false);

    return (
      <View style={[styles.container, props.containerStyles]}>
        <Text className={props.labelClassName}>{props.title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref} // Correct ref forwarding
            className={props.inputClassName}
            secureTextEntry={!toggle}
            value={props.value}
            placeholder={props.placeholder}
            placeholderTextColor="#ccc"
            onChangeText={props.onChangeText}
            autoCorrect={false}
          />
          {props.allowToggle && (
            <TouchableOpacity
              onPress={() => {
                setToggle(!toggle);
                console.log(toggle)
              }}
              style={styles.icon}
            >
              <Ionicons
                name={toggle ? "eye" : "eye-off"}
                size={20}
                color="#7F7F7F"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

CustomInput.displayName = "CustomInput";
CustomObscuredInput.displayName = "CustomObscuredInput";

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
  },
  inputContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 0.3,
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 10,
  },
  title: {
    color: "#ddd",
    fontSize: 12,
    marginBottom: 6,
  },
});

export { CustomInput, CustomObscuredInput };
