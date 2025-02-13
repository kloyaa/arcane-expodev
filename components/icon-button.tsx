import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"; // Install if not available

interface IconButtonProps {
  name?: string;  // Icon name, optional
  size?: number;  // Icon size, optional
  color?: string; // Icon color, optional
  onPress?: () => void;  // onPress handler, optional
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  name = 'ios-star', // Default placeholder icon
  size = 30,         // Default size
  color = '#FF9C01',    // Default color
  onPress = () => { }, // Default no-op function
  className
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={name} size={size} color={color} className={className} />
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;
