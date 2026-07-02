import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

const BENEFITS = [
  {
    title: 'Personalized AI Workouts',
    subtitle: 'Tailored regimens for your body and goals.',
  },
  {
    title: 'Smart Meal Plans',
    subtitle: 'Nutritional guidance aligned with your stewardship.',
  },
  {
    title: 'Daily Devotionals',
    subtitle: 'Spiritual nourishment to accompany physical training.',
  },
  {
    title: 'Ad-free experience',
    subtitle: 'Uninterrupted focus and reverent calm.',
  },
];

export default function Paywall() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="mx-auto w-full max-w-md px-5 pb-10 pt-14"
    >
      {/* Botón de cierre */}
      <Pressable
        onPress={() => router.back()}
        className="h-10 w-10 items-center justify-center self-end rounded-full bg-surface active:opacity-80"
      >
        <Ionicons name="close" size={22} color="#FAFAF9" />
      </Pressable>

      {/* Logo */}
      <View className="h-16 w-16 items-center justify-center self-center rounded-full border border-gold/40 bg-surface">
        <Ionicons name="barbell" size={28} color="#F4CE4B" />
      </View>

      <Text className="mt-6 text-center text-3xl font-bold text-cream">
        Unlock your Personal{'\n'}Trainer & Nutritionist
      </Text>
      <Text className="mt-3 text-center text-base text-cream/60">
        Elevate your physical discipline and spiritual devotion with premium access.
      </Text>

      {/* Beneficios */}
      <View className="mt-8 rounded-3xl bg-surface p-5">
        {BENEFITS.map((benefit, index) => (
          <View
            key={benefit.title}
            className={`flex-row items-start gap-3 ${index > 0 ? 'mt-5' : ''}`}
          >
            <View className="h-7 w-7 items-center justify-center rounded-full bg-sage/20">
              <Ionicons name="checkmark" size={16} color="#7BC496" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-cream">{benefit.title}</Text>
              <Text className="mt-1 text-sm text-cream/60">{benefit.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Precio */}
      <View className="mt-6 rounded-3xl border border-gold/60 bg-surface p-6">
        <Text className="text-center text-sm font-bold uppercase tracking-widest text-gold">
          Premium Membership
        </Text>
        <View className="mt-3 flex-row items-end justify-center">
          <Text className="text-5xl font-bold text-cream">$4.99</Text>
          <Text className="mb-2 ml-1 text-base text-cream/60">/ month</Text>
        </View>
        <Text className="mt-2 text-center text-sm text-cream/60">
          Cancel anytime. Billed monthly.
        </Text>

        <Pressable
          onPress={() => {
            // TODO: iniciar compra con RevenueCat; por ahora entra directo a la app
            router.replace('/workout');
          }}
          className="mt-5 flex-row items-center justify-center gap-2 rounded-2xl bg-gold py-4 active:opacity-80"
        >
          <Text className="text-lg font-bold text-background">Start Free Trial</Text>
          <Ionicons name="arrow-forward" size={20} color="#0C0A09" />
        </Pressable>

        <Text className="mt-3 text-center text-xs text-cream/60">
          7 days free, then $4.99/mo
        </Text>
      </View>

      <Pressable
        onPress={() => {
          // TODO: restaurar compras con RevenueCat
          console.log('Restore Purchases pressed');
        }}
        className="mt-8 active:opacity-80"
      >
        <Text className="text-center text-base font-semibold text-cream/80">
          Restore Purchases
        </Text>
      </Pressable>
    </ScrollView>
  );
}
