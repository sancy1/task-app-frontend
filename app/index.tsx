
// app/index.tsx

// Main home screen component that fetches and displays data from my backend API
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Constants from 'expo-constants';

console.log('API URL:', Constants.expoConfig?.extra?.apiUrl); // I debug log to verify API URL

// Type definition for the response I expect from my backend
type HelloResponse = {
  success: boolean;
  message: string;
  timestamp: string;
};

export default function HomeTab() {
  // Here is the State management for data, loading, and error handling
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the API URL from my Expo config
  const baseURL = Constants.expoConfig?.extra?.apiUrl as string;

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Async function to call my backend API
    const fetchHello = async () => {
      console.log('[HomeTab] mounted — fetching', `${baseURL}/hello`);
      try {
        const res = await fetch(`${baseURL}/hello`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: HelloResponse = await res.json();
        setData(json); // Store successful response
      } catch (err: any) {
        console.error('[HomeTab] fetch error', err);
        setError(err.message ?? String(err)); // Store error message
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchHello();
  }, [baseURL]);

  // Loading state UI
  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText>Loading…</ThemedText>
      </ThemedView>
    );
  }

  // Main render with API response data
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          API Greeting
        </ThemedText>

        {error ? (
          <ThemedText type="default"> Error: {error}</ThemedText>
        ) : data ? (
          <>
            <ThemedText type="subtitle">Message</ThemedText>
            <ThemedText type="default">{data.message}</ThemedText>

            <View style={styles.row}>
              <ThemedText type="subtitle">Status</ThemedText>
              <ThemedText type="default">{data.success ? ' Success' : ' Failed'}</ThemedText>
            </View>

            <ThemedText type="subtitle" style={{ marginTop: 12 }}>
              Time
            </ThemedText>
            <ThemedText type="default">
              {new Date(data.timestamp).toLocaleString()}
            </ThemedText>
          </>
        ) : (
          <ThemedText type="default">No data received</ThemedText>
        )}
      </View>
    </ThemedView>
  );
}

// Style definitions for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: Platform.select({ ios: 'rgba(255,255,255,0.9)', default: '#fff' }),
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});