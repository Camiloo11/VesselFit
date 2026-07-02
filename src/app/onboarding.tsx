import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const EXPERIENCE_LEVELS = [
  { id: 'beginner', title: 'Beginner', subtitle: 'Building the foundation' },
  { id: 'intermediate', title: 'Intermediate', subtitle: 'Consistent discipline' },
  { id: 'advanced', title: 'Advanced', subtitle: 'Mastering the craft' },
] as const;

const NUTRITION_GOALS = [
  { id: 'lose', title: 'Lose Weight', subtitle: 'Caloric deficit' },
  { id: 'maintain', title: 'Maintain', subtitle: 'Balanced intake' },
  { id: 'build', title: 'Build Muscle', subtitle: 'Caloric surplus' },
] as const;

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function SelectableRow({
  title,
  subtitle,
  selected,
  onPress,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mt-3 items-center rounded-2xl border px-4 py-4 active:opacity-80 ${
        selected ? 'border-gold bg-background' : 'border-surface-light bg-background/60'
      }`}
    >
      <Text className="text-base font-semibold text-cream">{title}</Text>
      <Text className="mt-1 text-xs text-cream/60">{subtitle}</Text>
    </Pressable>
  );
}

export default function Onboarding() {
  const [weight, setWeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [experience, setExperience] = useState<string>('intermediate');
  const [days, setDays] = useState<boolean[]>([true, false, true, false, true, false, false]);
  const [goal, setGoal] = useState<string>('maintain');

  const toggleDay = (index: number) =>
    setDays((prev) => prev.map((d, i) => (i === index ? !d : d)));

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-5 pb-12 pt-16"
    >
      {/* Encabezado */}
      <Text className="text-center text-3xl font-bold text-gold">VesselFit</Text>
      <Text className="mt-3 text-center text-2xl font-bold text-cream">Define Your Path</Text>
      <Text className="mt-2 text-center text-sm text-cream/60">
        Provide your details to forge a training protocol aligned with your stewardship.
      </Text>

      {/* Physical Baseline */}
      <View className="mt-8 rounded-3xl bg-surface p-5">
        <Text className="text-center text-xl font-bold text-cream">Physical Baseline</Text>
        <Text className="mt-4 text-sm text-cream/80">Weight (lbs)</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="0.0"
          placeholderTextColor="#FAFAF9"
          className="mt-2 rounded-xl border border-gold/40 bg-background py-4 text-center text-base text-cream"
        />
        <Text className="mt-4 text-sm text-cream/80">Height</Text>
        <View className="mt-2 flex-row gap-3">
          <TextInput
            value={heightFt}
            onChangeText={setHeightFt}
            keyboardType="numeric"
            placeholder="ft"
            placeholderTextColor="#78716C"
            className="flex-1 rounded-xl border border-surface-light bg-background py-4 text-center text-base text-cream"
          />
          <TextInput
            value={heightIn}
            onChangeText={setHeightIn}
            keyboardType="numeric"
            placeholder="in"
            placeholderTextColor="#78716C"
            className="flex-1 rounded-xl border border-surface-light bg-background py-4 text-center text-base text-cream"
          />
        </View>
      </View>

      {/* Experience Level */}
      <View className="mt-6 rounded-3xl bg-surface p-5">
        <View className="flex-row items-center justify-center gap-2">
          <Ionicons name="barbell" size={20} color="#F4CE4B" />
          <Text className="text-xl font-bold text-cream">Experience Level</Text>
        </View>
        {EXPERIENCE_LEVELS.map((level) => (
          <SelectableRow
            key={level.id}
            title={level.title}
            subtitle={level.subtitle}
            selected={experience === level.id}
            onPress={() => setExperience(level.id)}
          />
        ))}
      </View>

      {/* Commitment Days */}
      <View className="mt-6 rounded-3xl bg-surface p-5">
        <Text className="text-center text-xl font-bold text-cream">Commitment Days</Text>
        <Text className="mt-2 text-center text-xs text-cream/60">
          Select the days you will commit to training.
        </Text>
        <View className="mt-4 flex-row justify-between">
          {DAYS.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => toggleDay(index)}
              className={`h-10 w-10 items-center justify-center rounded-full border active:opacity-80 ${
                days[index] ? 'border-gold bg-gold' : 'border-surface-light bg-background'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  days[index] ? 'text-background' : 'text-cream/80'
                }`}
              >
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Nutrition Goal */}
      <View className="mt-6 rounded-3xl bg-surface p-5">
        <View className="flex-row items-center justify-center gap-2">
          <Ionicons name="restaurant" size={20} color="#F4CE4B" />
          <Text className="text-xl font-bold text-cream">Nutrition Goal</Text>
        </View>
        {NUTRITION_GOALS.map((g) => (
          <SelectableRow
            key={g.id}
            title={g.title}
            subtitle={g.subtitle}
            selected={goal === g.id}
            onPress={() => setGoal(g.id)}
          />
        ))}
      </View>

      {/* Generate My Path */}
      <Pressable
        onPress={() => {
          // TODO: guardar el perfil en Supabase y navegar al paywall
          console.log({ weight, heightFt, heightIn, experience, days, goal });
        }}
        className="mt-8 flex-row items-center justify-center gap-2 rounded-full bg-gold py-4 active:opacity-80"
      >
        <Text className="text-lg font-bold text-background">Generate My Path</Text>
        <Ionicons name="arrow-forward" size={20} color="#0C0A09" />
      </Pressable>
    </ScrollView>
  );
}
