
// app/index.tsx

/*
  Index Screen (Entry Point)
  --------------------------
  - This is the root entry point of the app.
  - Its responsibility is to check authentication status
    and redirect the user to the correct part of the app.

  - If the user is authenticated -> redirect to the main tabs layout.
  - If the user is not authenticated -> redirect to the login screen.
  - While the authentication state is being determined -> show a loading indicator.
*/

import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter, type Href } from 'expo-router';

export default function Index() {
  // Access authentication state (user + loading flag)
  const { user, isLoading } = useAuth();

  // Router instance to handle navigation
  const router = useRouter();

  /*
    useEffect:
    - Runs whenever "user" or "isLoading" changes.
    - Once authentication check finishes:
        -> If user exists, redirect to the main app (/tabs).
        -> If no user, redirect to the login page.
  */
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/(tabs)' as Href);
      } else {
        router.replace('/auth/login' as Href);
      }
    }
  }, [user, isLoading]);

  /*
    If the authentication check is still loading:
    - Show a full-screen loading spinner and "Loading..." text.
  */
  if (isLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <ThemedText style={{ marginTop: 16 }}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  /*
    Fallback (this shows briefly during redirects):
    - Displays a spinner and "Redirecting..." message.
    - User will be navigated immediately to either tabs or login.
  */
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <ThemedText style={{ marginTop: 16 }}>Redirecting...</ThemedText>
    </ThemedView>
  );
}
