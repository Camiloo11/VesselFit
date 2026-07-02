import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

const MEALS = [
  {
    label: 'Breakfast',
    icon: 'sunny-outline',
    kcal: 350,
    title: 'Oatmeal with berries',
    description: 'Rolled oats, almond milk, mixed berries, and a touch of honey.',
    hasPhoto: true,
    highlight: false,
  },
  {
    label: 'Snacks',
    icon: 'cafe-outline',
    kcal: 150,
    title: 'Greek yogurt',
    description: 'Plain, unsweetened Greek yogurt packed with protein.',
    hasPhoto: false,
    highlight: false,
  },
  {
    label: 'Lunch',
    icon: 'sunny',
    kcal: 550,
    title: 'Grilled chicken breast with quinoa',
    description: 'Lean protein paired with complex carbohydrates and steamed greens.',
    hasPhoto: true,
    highlight: false,
  },
  {
    label: 'Dinner',
    icon: 'moon-outline',
    kcal: 480,
    title: 'Salmon with asparagus',
    description: 'Rich in Omega-3s, baked salmon served with roasted asparagus spears.',
    hasPhoto: true,
    highlight: true,
  },
] as const;

export default function Nutrition() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="mx-auto w-full max-w-md px-5 pb-8 pt-14"
    >
      <Text className="text-3xl font-bold text-cream">Today&apos;s Fuel</Text>
      <Text className="mt-2 text-base text-cream/60">
        Nourish your temple for peak performance and spiritual clarity.
      </Text>

      {MEALS.map((meal) => (
        <View
          key={meal.label}
          className={`mt-5 rounded-3xl bg-surface p-5 ${
            meal.highlight ? 'border border-gold/60' : ''
          }`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name={meal.icon} size={20} color="#F4CE4B" />
              <Text className="text-xl font-bold text-cream">{meal.label}</Text>
            </View>
            <View className="rounded-full bg-background px-3 py-1">
              <Text className="text-xs font-semibold text-sage">{meal.kcal} kcal</Text>
            </View>
          </View>

          <Text className="mt-4 text-base font-bold text-cream">{meal.title}</Text>
          <Text className="mt-1 text-sm leading-5 text-cream/60">{meal.description}</Text>

          {meal.hasPhoto && (
            // TODO: fotos reales cuando la IA genere los planes de comida
            <View className="mt-4 h-32 items-center justify-center rounded-2xl bg-background">
              <Ionicons name="image-outline" size={28} color="#78716C" />
            </View>
          )}
        </View>
      ))}

      {/* Disclaimer médico */}
      <View className="mt-6 rounded-3xl border border-red-400/30 bg-red-950/30 p-5">
        <View className="flex-row items-center gap-2">
          <Ionicons name="warning-outline" size={18} color="#F87171" />
          <Text className="text-base font-bold text-red-400">Medical Disclaimer</Text>
        </View>
        <Text className="mt-2 text-sm leading-5 text-cream/70">
          This smart meal plan is for informational purposes only. Please consult with a
          certified nutritionist or healthcare professional before changing your diet.
        </Text>
      </View>
    </ScrollView>
  );
}
