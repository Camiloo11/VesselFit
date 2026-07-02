import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';

const EXERCISES = [
  { name: 'Bench Press', muscles: 'Chest, Triceps', sets: '3 x 10', icon: 'barbell' },
  { name: 'Pull-ups', muscles: 'Back, Biceps', sets: '3 x Max', icon: 'body' },
  { name: 'Overhead Press', muscles: 'Shoulders, Triceps', sets: '3 x 12', icon: 'man' },
] as const;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Workout() {
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const fullName: string | undefined =
        data.user?.user_metadata?.full_name ?? data.user?.user_metadata?.name;
      if (fullName) setFirstName(fullName.split(' ')[0]);
    });
  }, []);

  const today = new Date()
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    .toUpperCase();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="mx-auto w-full max-w-md px-5 pb-8 pt-14"
    >
      {/* Barra superior */}
      <View className="flex-row items-center justify-between">
        <Ionicons name="barbell" size={24} color="#F4CE4B" />
        <Text className="text-2xl font-bold text-gold">VesselFit</Text>
        <Ionicons name="person-circle-outline" size={28} color="#F4CE4B" />
      </View>

      {/* Saludo */}
      <Text className="mt-8 text-sm font-semibold tracking-widest text-cream/50">{today}</Text>
      <Text className="mt-1 text-3xl font-bold text-cream">
        {getGreeting()}, {firstName ?? 'friend'}.
      </Text>

      {/* Daily Focus */}
      <View className="mt-6 rounded-3xl border-t-2 border-gold bg-surface p-5">
        <View className="flex-row items-center gap-2">
          <Ionicons name="bookmark" size={16} color="#F4CE4B" />
          <Text className="text-xs font-bold uppercase tracking-widest text-gold">
            Daily Focus
          </Text>
        </View>
        <Text className="mt-4 font-serif text-lg italic leading-7 text-cream">
          &ldquo;If a man cleanses himself, he will be a vessel for honor, sanctified and useful
          for the Master.&rdquo;
        </Text>
        <Text className="mt-3 text-right text-sm text-cream/60">— 2 Timothy 2:21</Text>
      </View>

      {/* Today's Workout */}
      <Text className="mt-8 text-2xl font-bold text-cream">Today&apos;s Workout</Text>
      <View className="mt-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Ionicons name="flash" size={16} color="#7BC496" />
          <Text className="text-base font-semibold text-sage">Upper Body Strength</Text>
        </View>
        <View className="rounded-full bg-surface-light px-3 py-1">
          <Text className="text-xs font-semibold text-cream/80">45 Min</Text>
        </View>
      </View>

      {/* Ejercicios */}
      {EXERCISES.map((exercise) => (
        <View
          key={exercise.name}
          className="mt-3 flex-row items-center rounded-2xl border border-surface-light bg-surface p-4"
        >
          <View className="h-12 w-12 items-center justify-center rounded-full bg-background">
            <Ionicons name={exercise.icon} size={22} color="#E7E5E4" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-base font-bold text-cream">{exercise.name}</Text>
            <Text className="mt-1 text-sm text-cream/60">{exercise.muscles}</Text>
          </View>
          <View className="items-end">
            <Text className="text-base font-bold text-cream">{exercise.sets}</Text>
            <Text className="mt-1 text-xs text-cream/60">Sets x Reps</Text>
          </View>
        </View>
      ))}

      {/* Start Workout */}
      <Pressable
        onPress={() => {
          // TODO: pantalla de entrenamiento activo
          console.log('Start Workout pressed');
        }}
        className="mt-8 flex-row items-center justify-center gap-2 rounded-full bg-gold py-4 active:opacity-80"
      >
        <Ionicons name="play" size={18} color="#0C0A09" />
        <Text className="text-lg font-bold text-background">Start Workout</Text>
      </Pressable>
    </ScrollView>
  );
}
