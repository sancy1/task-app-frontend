
// app/task/new.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TaskForm, TaskFormValues } from '@/components/TaskForm';

export default function NewTaskScreen() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <ThemedView style={styles.container}>
        <TaskForm
          onSubmit={async (_data: TaskFormValues) => {
            // TaskForm already creates the task (via context).
            // After creation, return to tasks list.
            router.replace('/(tabs)/tasks');
          }}
          onCancel={() => router.back()}
        />
      </ThemedView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

