import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ThemeToggleProps {
    onToggle: () => void;
    isDarkMode: boolean; // Add isDarkMode prop
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle, isDarkMode }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onToggle}>
            <View style={[styles.iconContainer, isDarkMode ? styles.darkIconContainer : styles.lightIconContainer]}>
                <Ionicons
                    name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
                    size={25}
                    color={isDarkMode ? 'white' : 'orange'}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    lightIconContainer: {
        backgroundColor: 'white',
    },
    darkIconContainer: {
        backgroundColor: '#111',
    },
});

export default ThemeToggle;