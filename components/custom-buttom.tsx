import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

// Define the props interface
interface CustomButtonProps {
  title: string; // Title is required and must be a string
  containerStyles?: ViewStyle; // Optional custom styles for the container
  textStyles?: TextStyle; // Optional custom styles for the text
  disabled?: boolean; // Optional disabled state
  isLoading?: boolean;
  handlePress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyles,
  textStyles,
  disabled,
  isLoading,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        containerStyles, // Custom container styles
        disabled && styles.disabledButton, // Conditional style for disabled state
        // isLoading && { opacity: 0.5 },
      ]}
      className="rounded-xl min-h-[52px] flex justify-center items-center"
      onPress={handlePress}
      disabled={disabled || isLoading} // Disable button when loading
    >
      <Text style={[styles.buttonText, textStyles]}>
        {isLoading ? (
          <ActivityIndicator color="#161622" /> // Show spinner when loading
        ) : (
          <Text style={[styles.buttonText, textStyles]}>{title}</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#FF9F1C',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 60,
    paddingHorizontal: 24, // Default background color
  },
  buttonText: {
    color: '#161622', // Default text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC', // Grayed-out background for disabled state
  },
});
