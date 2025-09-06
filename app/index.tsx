// app/index.tsx

// import React from 'react';
// import { View, StyleSheet, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Link } from 'expo-router';

// export default function AppIndex() {
//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText type="title" style={styles.title}>
//         Welcome to Task App
//       </ThemedText>

//       <ThemedText type="default" style={styles.subtitle}>
//         This is the home route of your app.
//       </ThemedText>

//       <View style={styles.linkContainer}>
//         {/* Example navigation to tabs */}
//         <Link href="/(tabs)" style={styles.linkText}>
//           Go to Home Tabs
//         </Link>
//       </View>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: Platform.select({ ios: '#f2f2f2', default: '#fff' }),
//   },
//   title: {
//     fontSize: 28,
//     marginBottom: 12,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   linkContainer: {
//     marginTop: 16,
//   },
//   linkText: {
//     fontSize: 18,
//     color: '#1E90FF',
//     textDecorationLine: 'underline',
//   },
// });
















// app/(tabs)/index.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Constants from 'expo-constants';

console.log('API URL:', Constants.expoConfig?.extra?.apiUrl);

type HelloResponse = {
  success: boolean;
  message: string;
  timestamp: string;
};

export default function HomeTab() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseURL = Constants.expoConfig?.extra?.apiUrl as string;

  useEffect(() => {
    const fetchHello = async () => {
      console.log('[HomeTab] mounted — fetching', `${baseURL}/hello`);
      try {
        const res = await fetch(`${baseURL}/hello`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: HelloResponse = await res.json();
        setData(json);
      } catch (err: any) {
        console.error('[HomeTab] fetch error', err);
        setError(err.message ?? String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchHello();
  }, [baseURL]);

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText>Loading…</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          API Greeting
        </ThemedText>

        {error ? (
          <ThemedText type="default">⚠️ Error: {error}</ThemedText>
        ) : data ? (
          <>
            <ThemedText type="subtitle">Message</ThemedText>
            <ThemedText type="default">{data.message}</ThemedText>

            <View style={styles.row}>
              <ThemedText type="subtitle">Status</ThemedText>
              <ThemedText type="default">{data.success ? '✅ Success' : '❌ Failed'}</ThemedText>
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
