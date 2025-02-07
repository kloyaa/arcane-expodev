import { ImageSourcePropType } from 'react-native';

export interface ITabIconProps {
  icon: ImageSourcePropType; // Better type for image source
  color: string;
  name: string;
  focused: boolean;
}
