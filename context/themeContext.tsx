import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, NativeTheme } from '@/theme/theme';

interface ThemeContextType {
    theme: NativeTheme;
    toggleTheme: () => Promise<void>;
    setThemeMode: (mode: 'light' | 'dark' | 'system') => Promise<void>;
    themeMode: 'light' | 'dark' | 'system';
}

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    toggleTheme: async () => { },
    setThemeMode: async () => { },
    themeMode: 'system'
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: React.ReactNode;
}

const THEME_MODE_KEY = '@theme_mode';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeModeState] = useState<'light' | 'dark' | 'system'>('dark');

    useEffect(() => {
        loadSavedThemeMode();
    }, []);

    const loadSavedThemeMode = async () => {
        try {
            const savedMode = await AsyncStorage.getItem(THEME_MODE_KEY);
            if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
                setThemeModeState(savedMode as 'light' | 'dark' | 'system');
            }
        } catch (error) {
            console.error('Error loading theme mode:', error);
        }
    };

    const setThemeMode = async (mode: 'light' | 'dark' | 'system') => {
        setThemeModeState(mode);
        try {
            await AsyncStorage.setItem(THEME_MODE_KEY, mode);
        } catch (error) {
            console.error('Error saving theme mode:', error);
        }
    };

    const toggleTheme = async () => {
        const newMode = themeMode === 'dark' ? 'light' : 'dark';
        await setThemeMode(newMode);
    };

    const getCurrentTheme = (): NativeTheme => {
        if (themeMode === 'system') {
            return systemColorScheme === 'dark' ? darkTheme : lightTheme;
        }
        return themeMode === 'dark' ? darkTheme : lightTheme;
    };

    const value: ThemeContextType = {
        theme: getCurrentTheme(),
        toggleTheme,
        setThemeMode,
        themeMode
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};