// app/auth/register.tsx

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useAuth } from '@/src/contexts/AuthContext'; // Auth context provides register function
import { useRouter, type Href } from 'expo-router';

/*
  RegisterScreen Component
  ------------------------
  This screen allows new users to create an account.
  Features:
   - Input fields for first name, last name, email, and password
   - Validates required fields (email + password must be filled)
   - Calls `register` from AuthContext to create user in backend
   - Navigates to main tabs on success
   - Provides a link to the Login screen if user already has an account
*/
export default function RegisterScreen() {
  // Local state to store form field values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Access the register function from AuthContext
  const { register } = useAuth();

  // Router for navigation
  const router = useRouter();

  // Handle register button press
  const handleRegister = async () => {
    // Validate required fields
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    setIsLoading(true); // Set loading state
    try {
      // Call register function with form data
      await register({ email, password, first_name: firstName, last_name: lastName });

      // On success, navigate to main app (tabs)
      router.replace('/(tabs)' as Href);
    } catch (error: any) {
      // Show error if registration fails
      Alert.alert('Registration Failed', error.message || 'An error occurred during registration');
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // Navigate back to login screen
  const handleNavigateToLogin = () => {
    router.push('/auth/login' as Href);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.form}>
        {/* ================== HEADER ================== */}
        <ThemedText type="title" style={styles.title}>
          Create Account
        </ThemedText>

        {/* ================== INPUT FIELDS ================== */}
        <ThemedTextInput
          placeholder="First Name (Optional)"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <ThemedTextInput
          placeholder="Last Name (Optional)"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

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
          secureTextEntry // masks password input
          style={styles.input}
        />

        {/* ================== REGISTER BUTTON ================== */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </ThemedText>
        </TouchableOpacity>

        {/* ================== LINK TO LOGIN ================== */}
        <TouchableOpacity style={styles.link} onPress={handleNavigateToLogin}>
          <ThemedText style={styles.linkText}>
            Already have an account? Sign in
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
