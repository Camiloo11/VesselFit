import { Stack } from 'expo-router';

import '../global.css';
// Inicializa el cliente al arrancar: si falta el .env, falla temprano y con mensaje claro
import '@/lib/supabase';

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
