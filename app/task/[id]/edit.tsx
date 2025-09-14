// app/task/[id]/edit.tsx

/* 
  EditTaskScreen
  --------------
  Screen for editing an existing task. Uses the `id` route param to find
  the task in the global tasks context and renders TaskEditForm with the
  task's data. Navigates back to the tasks list after submit/cancel.
*/

import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TaskEditForm } from '@/components/TaskEditForm';
import { useTasks } from '@/src/contexts/TaskContext';

export default function EditTaskScreen() {
  /* Get the dynamic :id param from the route (expo-router) */
  const { id } = useLocalSearchParams<{ id: string }>();

  /* Router for navigation actions */
  const router = useRouter();

  /* Tasks from context (global state) */
  const { tasks } = useTasks();

  /* Find the task by id from the tasks array */
  const task = tasks.find(t => t.id === id);

  //  Always go to tasks page (prevents GO_BACK warning)
  const handleExit = () => {
    /* Use replace so we don't leave this page on the history stack */
    router.replace('/tasks');
  };

  /* If the task doesn't exist (invalid id), show a friendly message */
  if (!task) {
    return (
      <ProtectedRoute>
        <ThemedView style={styles.center}>
          <ThemedText>Task not found</ThemedText>
        </ThemedView>
      </ProtectedRoute>
    );
  }

  /* Normalize the task data to ensure optional fields are undefined if absent */
  const normalized = {
    title: task.title,
    description: task.description ?? undefined,
    status: task.status ?? undefined,
    priority: task.priority ?? undefined,
    due_date: task.due_date ?? undefined,
  };

  return (
    <ProtectedRoute>
      {/*  Custom header */}
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

/* Styles (unchanged) */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
