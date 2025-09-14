
// app/profile.tsx

/*
  Profile Screen
  --------------
  - Displays the logged-in user's profile information (name, email, initials).
  - Fetches profile details from the backend API using the stored access token.
  - Provides a logout button to end the session.
  - Uses ProtectedRoute to ensure only authenticated users can access this page.
*/

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/src/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { authAPI } from '@/src/services/api';
import { User } from '@/src/types/auth'; //  strongly typed user object

export default function ProfileScreen() {
  // Access authentication context (for token + logout function)
  const { accessToken, logout } = useAuth();

  // Local state to hold profile info + loading status
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /*
    useEffect:
    - Runs when accessToken changes.
    - Calls backend API to fetch user profile details.
    - Handles loading and error states.
  */
  useEffect(() => {
    const loadProfile = async () => {
      if (!accessToken) return;
      try {
        setLoading(true);
        const data = await authAPI.getProfile(accessToken);
        setProfile(data); //  API already returns User object
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [accessToken]);

  /*
    handleLogout:
    - Calls logout from AuthContext.
    - Handles potential errors (e.g., network or token issues).
  */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  /*
    Show loading spinner while profile is being fetched
  */
  if (loading) {
    return (
      <ProtectedRoute>
        <ThemedView style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </ThemedView>
      </ProtectedRoute>
    );
  }

  /*
    If profile data could not be loaded, display fallback message
  */
  if (!profile) {
    return (
      <ProtectedRoute>
        <ThemedView style={styles.center}>
          <ThemedText>No profile data</ThemedText>
        </ThemedView>
      </ProtectedRoute>
    );
  }

  //  Normalize profile fields (avoid null values)
  const firstName = profile.first_name ?? '';
  const lastName = profile.last_name ?? '';
  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  /*
    Render profile screen:
    - Avatar with initials
    - Full name and email
    - Extra info (e.g., join date placeholder)
    - Logout button
  */
  return (
    <ProtectedRoute>
      <ThemedView style={styles.container}>
        {/* Avatar Circle with initials */}
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>{initials}</ThemedText>
        </View>

        {/* User name */}
        <ThemedText type="title" style={styles.name}>
          {firstName} {lastName}
        </ThemedText>

        {/* User email */}
        <ThemedText style={styles.email}>{profile.email}</ThemedText>

        {/* Extra info (currently only icon, text commented out) */}
        <View style={styles.infoCard}>
          <IconSymbol name="calendar" size={20} color="#6B7280" />
          {/* <ThemedText style={styles.infoText}>
            Joined {new Date(profile.created_at).toLocaleDateString()}
          </ThemedText> */}
        </View>

        {/* Logout button */}
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
