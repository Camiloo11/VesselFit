import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';

type Profile = {
  full_name: string | null;
  weight_lbs: number | null;
  height_ft: number | null;
  height_in: number | null;
  experience: string | null;
  training_days: boolean[] | null;
  nutrition_goal: string | null;
};

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const GOAL_LABELS: Record<string, string> = {
  lose: 'Lose Weight',
  maintain: 'Maintain',
  build: 'Build Muscle',
};

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between border-b border-surface-light py-4 last:border-b-0">
      <Text className="text-sm text-cream/60">{label}</Text>
      <Text className="text-base font-semibold text-cream">{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? null);

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      setProfile(data);
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  const trainingDaysCount = profile?.training_days?.filter(Boolean).length ?? 0;
  const height =
    profile?.height_ft != null
      ? `${profile.height_ft}' ${profile.height_in ?? 0}"`
      : '—';

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="mx-auto w-full max-w-md px-5 pb-8 pt-14"
    >
      {/* Encabezado */}
      <View className="items-center">
        <View className="h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-surface">
          <Ionicons name="person" size={32} color="#F4CE4B" />
        </View>
        <Text className="mt-4 text-2xl font-bold text-cream">
          {profile?.full_name ?? 'Your Profile'}
        </Text>
        {email && <Text className="mt-1 text-sm text-cream/60">{email}</Text>}
      </View>

      {/* Datos del onboarding */}
      <View className="mt-8 rounded-3xl bg-surface px-5 py-1">
        <StatRow
          label="Weight"
          value={profile?.weight_lbs != null ? `${profile.weight_lbs} lbs` : '—'}
        />
        <StatRow label="Height" value={height} />
        <StatRow
          label="Experience"
          value={EXPERIENCE_LABELS[profile?.experience ?? ''] ?? '—'}
        />
        <StatRow
          label="Nutrition Goal"
          value={GOAL_LABELS[profile?.nutrition_goal ?? ''] ?? '—'}
        />
        <StatRow label="Commitment" value={`${trainingDaysCount} days / week`} />
      </View>

      {/* Editar onboarding */}
      <Pressable
        onPress={() => router.push('/onboarding')}
        className="mt-6 flex-row items-center justify-center gap-2 rounded-full border border-gold/60 py-4 active:opacity-80"
      >
        <Ionicons name="create-outline" size={18} color="#F4CE4B" />
        <Text className="text-base font-semibold text-gold">Edit My Path</Text>
      </Pressable>

      {/* Cerrar sesión */}
      <Pressable
        onPress={signOut}
        className="mt-3 flex-row items-center justify-center gap-2 rounded-full border border-red-400/40 py-4 active:opacity-80"
      >
        <Ionicons name="log-out-outline" size={18} color="#F87171" />
        <Text className="text-base font-semibold text-red-400">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}
