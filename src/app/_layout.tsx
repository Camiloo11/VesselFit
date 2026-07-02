import { Stack } from 'expo-router';

import '../global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0C0A09' },
      }}
    />
  );
}
