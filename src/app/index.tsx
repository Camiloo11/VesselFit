import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';

export default function Login() {
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    // Al volver de Google (o si ya había sesión guardada), entra a la app
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace('/onboarding');
    });
    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (Platform.OS !== 'web') {
      // TODO: flujo nativo con expo-web-browser cuando activemos Expo Go
      Alert.alert('Por ahora', 'Prueba el login desde el navegador (tecla w).');
      return;
    }
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setSigningIn(false);
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      {/* Logo */}
      <View className="h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-surface">
        <Ionicons name="barbell" size={34} color="#F4CE4B" />
      </View>

      <Text className="mt-5 text-4xl font-bold text-gold">VesselFit</Text>

      <Text className="mt-4 text-center text-base italic text-cream/80">
        &ldquo;Honor God with your body.{'\n'}(1 Corinthians 6:19)&rdquo;
      </Text>

      {/* Tarjeta de autenticación */}
      <View className="mt-12 w-full max-w-sm rounded-3xl border border-surface-light bg-surface/80 p-5">
        <Pressable
          className="flex-row items-center justify-center gap-2 rounded-2xl bg-gold py-4 active:opacity-80 disabled:opacity-60"
          disabled={signingIn}
          onPress={signInWithGoogle}
        >
          <Ionicons name="logo-google" size={20} color="#0C0A09" />
          <Text className="text-base font-semibold text-background">
            {signingIn ? 'Connecting…' : 'Continue with Google'}
          </Text>
        </Pressable>

        <Text className="mt-4 text-center text-xs leading-5 text-cream/60">
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </View>
  );
}
