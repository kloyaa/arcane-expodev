import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const PlaygroundLayout = (): JSX.Element => {
  return (
    <>
      <Stack>
        <Stack.Screen name="firebase-pushnotification" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default PlaygroundLayout;