
// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Centralized tab configuration
const TAB_SCREENS = [
  { name: 'index', title: 'Home', icon: 'house.fill' },
  { name: 'tasks', title: 'Tasks', icon: 'list.bullet' },
  { name: 'explore', title: 'Explore', icon: 'paperplane.fill' },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' }, // Transparent background on iOS for blur
          default: {},
        }),
      }}
    >
      {TAB_SCREENS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name={icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
