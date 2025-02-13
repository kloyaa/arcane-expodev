import React from 'react';
import { Text as NativeText, StyleProp, TextStyle } from 'react-native';

interface TextProps {
    className?: string;
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ className, style, children }) => {
    return (
        <NativeText className={className} style={style}>
            {children}
        </NativeText>
    );
};

export default Text;