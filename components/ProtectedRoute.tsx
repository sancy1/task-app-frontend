
// // src/components/ProtectedRoute.tsx

// import React from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { useAuth } from '@/src/contexts/AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//         <ThemedText style={{ marginTop: 16 }}>Loading...</ThemedText>
//       </ThemedView>
//     );
//   }

//   if (!user) {
//     return (
//       <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//         <ThemedText type="title">Access Denied</ThemedText>
//         <ThemedText style={{ marginTop: 16, textAlign: 'center' }}>
//           Please log in to access this page.
//         </ThemedText>
//       </ThemedView>
//     );
//   }

//   return <>{children}</>;
// };






















// src/components/ProtectedRoute.tsx

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/src/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectOnDeny?: boolean; // ✅ optional: redirect instead of showing message
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectOnDeny }) => {
  const { user, isLoading, accessToken } = useAuth();

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText style={{ marginTop: 16 }}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!user || !accessToken) {
    if (redirectOnDeny) {
      // ✅ auto-redirect to landing/login
        return <Redirect href="/auth/login" />;
    }

    // ✅ fallback: show "Access Denied"
    return (
      <ThemedView style={styles.center}>
        <ThemedText type="title">Access Denied</ThemedText>
        <ThemedText style={{ marginTop: 16, textAlign: 'center' }}>
          Please log in to access this page.
        </ThemedText>
      </ThemedView>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});
