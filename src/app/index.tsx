import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Login() {
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
          className="flex-row items-center justify-center gap-2 rounded-2xl bg-gold py-4 active:opacity-80"
          onPress={() => {
            // TODO: autenticación con Google vía Supabase; por ahora navega directo
            router.push('/onboarding');
          }}
        >
          <Ionicons name="logo-google" size={20} color="#0C0A09" />
          <Text className="text-base font-semibold text-background">
            Continue with Google
          </Text>
        </Pressable>

        <Text className="mt-4 text-center text-xs leading-5 text-cream/60">
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </View>
  );
}
