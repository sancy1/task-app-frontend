
// // app/(tabs)/index.tsx

import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeTab() {
  return (
    <ThemedView>
      <ThemedText>Welcome to your Home Tab!</ThemedText>
    </ThemedView>
  );
}
