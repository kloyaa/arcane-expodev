interface FontStyle {
    fontFamily: string;
    fontWeight: string;
}

export interface NativeTheme {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        card: string;
        text: string;
        border: string;
        notification: string;
    };
    fonts: {
        regular: FontStyle;
        medium: FontStyle;
        bold: FontStyle;
        heavy: FontStyle;
    };
}
export const lightTheme: NativeTheme = {
    dark: false,
    colors: {
        primary: '#007AFF',
        background: '#FFFFFF',
        card: '#F2F2F7',
        text: '#000000',
        border: '#C6C6C8',
        notification: '#FF3B30'
    },
    fonts: {
        regular: {
            fontFamily: 'System',
            fontWeight: '400'
        },
        medium: {
            fontFamily: 'System',
            fontWeight: '500'
        },
        bold: {
            fontFamily: 'System',
            fontWeight: '700'
        },
        heavy: {
            fontFamily: 'System',
            fontWeight: '800'
        }
    }
};

export const darkTheme: NativeTheme = {
    dark: true,
    colors: {
        primary: '#0A84FF',
        background: '#021526',
        card: '#1C1C1E',
        text: '#FFFFFF',
        border: '#38383A',
        notification: '#FF453A'
    },
    fonts: {
        regular: {
            fontFamily: 'System',
            fontWeight: '400'
        },
        medium: {
            fontFamily: 'System',
            fontWeight: '500'
        },
        bold: {
            fontFamily: 'System',
            fontWeight: '700'
        },
        heavy: {
            fontFamily: 'System',
            fontWeight: '800'
        }
    }
};
