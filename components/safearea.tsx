import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SafeArea = ({ children, props }: { children: React.ReactNode, props?: any }) => {
    return (
        <SafeAreaView className='bg-white dark:bg-gray-800 px-4 py-5' {...props}>
            {children}
        </SafeAreaView>
    )
}

export default SafeArea