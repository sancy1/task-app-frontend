// app/auth/login.tsx

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter, type Href } from 'expo-router';

/*
  LoginScreen Component
  ---------------------
  This screen allows users to log into the app using email + password.
  It includes:
   - Input fields for email and password
   - Validation (ensures both fields are filled)
   - Calls the `login` function from AuthContext
   - Navigates to the main app (tabs) after login
   - A link to navigate to the Register screen if user doesn’t have an account
*/
export default function LoginScreen() {
  // Local state for form fields and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auth context hook for login function
  const { login } = useAuth();

  // Router from Expo Router for navigation
  const router = useRouter();

  // Handle login button press
  const handleLogin = async () => {
    // Basic validation: ensure both fields are filled
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true); // Show loading state
    try {
      // Call login function (connects with backend)
      await login({ email, password });

      // Navigate to the main tab screen on success
      router.replace('/(tabs)' as Href);
    } catch (error: any) {
      // Show error message if login fails
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // Navigate to register screen
  const handleNavigateToRegister = () => {
    router.push('/auth/register' as Href);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.form}>
        {/* ================== HEADER ================== */}
        <View style={styles.header}>
          <ThemedText type="title">
            Note Taking App
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Welcome Back | Login
          </ThemedText>
        </View>

        {/* ================== INPUT FIELDS ================== */}
        <ThemedTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // hides text for passwords
          style={styles.input}
        />

        {/* ================== LOGIN BUTTON ================== */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading} // prevent multiple presses during loading
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </ThemedText>
        </TouchableOpacity>

        {/* ================== LINK TO REGISTER ================== */}
        <TouchableOpacity style={styles.link} onPress={handleNavigateToRegister}>
          <ThemedText style={styles.linkText}>
            Don't have an account? Sign up
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    backgroundColor: Platform.select({ ios: 'rgba(255,255,255,0.1)', default: 'transparent' }),
    borderRadius: 12,
    padding: 24,
    gap: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});