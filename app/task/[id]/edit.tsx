

// app/task/[id]/edit.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TaskEditForm } from '@/components/TaskEditForm';
import { useTasks } from '@/src/contexts/TaskContext';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks } = useTasks();

  const task = tasks.find(t => t.id === id);

  // ✅ Always go to tasks page (prevents GO_BACK warning)
  const handleExit = () => {
    router.replace('/tasks');
  };

  if (!task) {
    return (
      <ProtectedRoute>
        <ThemedView style={styles.center}>
          <ThemedText>Task not found</ThemedText>
        </ThemedView>
      </ProtectedRoute>
    );
  }

  const normalized = {
    title: task.title,
    description: task.description ?? undefined,
    status: task.status ?? undefined,
    priority: task.priority ?? undefined,
    due_date: task.due_date ?? undefined,
  };

  return (
    <ProtectedRoute>
      {/* ✅ Custom header */}
      <Stack.Screen options={{ title: 'Go Back' }} />

      <ThemedView style={styles.container}>
        <TaskEditForm
          taskId={task.id}
          initialData={normalized}
          onSubmit={handleExit}
          onCancel={handleExit}
        />
      </ThemedView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
