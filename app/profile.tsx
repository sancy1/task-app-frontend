// app/profile.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/src/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { authAPI } from '@/src/services/api';
import { User } from '@/src/types/auth'; // ✅ assuming you already have User type

export default function ProfileScreen() {
  const { accessToken, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!accessToken) return;
      try {
        setLoading(true);
        const data = await authAPI.getProfile(accessToken);
        setProfile(data); // ✅ API already returns User
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <ThemedView style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </ThemedView>
      </ProtectedRoute>
    );
  }

  if (!profile) {
    return (
      <ProtectedRoute>
        <ThemedView style={styles.center}>
          <ThemedText>No profile data</ThemedText>
        </ThemedView>
      </ProtectedRoute>
    );
  }

  // ✅ normalize null values
  const firstName = profile.first_name ?? '';
  const lastName = profile.last_name ?? '';
  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <ProtectedRoute>
      <ThemedView style={styles.container}>
        {/* Avatar + Name */}
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>{initials}</ThemedText>
        </View>
        <ThemedText type="title" style={styles.name}>
          {firstName} {lastName}
        </ThemedText>
        <ThemedText style={styles.email}>{profile.email}</ThemedText>

        <View style={styles.infoCard}>
          <IconSymbol name="calendar" size={20} color="#6B7280" />
          {/* <ThemedText style={styles.infoText}>
            Joined {new Date(profile.created_at).toLocaleDateString()}
          </ThemedText> */}
        </View>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="white" />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: { fontSize: 36, fontWeight: '700', color: '#007AFF' },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  email: { color: '#6B7280', marginBottom: 24 },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 32,
  },
  infoText: { color: '#374151' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  logoutText: { color: 'white', fontWeight: '600' },
});
