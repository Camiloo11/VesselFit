import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-4xl font-bold text-gold">VesselFit</Text>
      <Text className="mt-2 text-base italic text-cream/70">
        &ldquo;Honor God with your body.&rdquo;
      </Text>
      <View className="mt-6 rounded-full bg-gold px-8 py-3">
        <Text className="text-lg font-semibold text-background">
          NativeWind funciona ✓
        </Text>
      </View>
    </View>
  );
}
