
// app/task/new.tsx

/*
  NewTaskScreen
  -------------
  This screen is responsible for creating a new task.

  - It uses the reusable <TaskForm /> component to handle input fields and submission.
  - The form automatically handles task creation (via TaskContext).
  - After a task is created, the user is redirected back to the tasks list.
  - If the user cancels, they are taken back to the previous screen.
*/

import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TaskForm, TaskFormValues } from '@/components/TaskForm';

export default function NewTaskScreen() {
  // Router instance for navigation
  const router = useRouter();

  return (
    <ProtectedRoute>
      <ThemedView style={styles.container}>
        <TaskForm
          /* 
            onSubmit:
            - Triggered when the user submits the form
            - TaskForm handles creating the task through context
            - After creation, redirect the user to the task list
          */
          onSubmit={async (_data: TaskFormValues) => {
            router.replace('/(tabs)/tasks');
          }}

          /*
            onCancel:
            - Triggered when the user cancels task creation
            - Navigates back to the previous screen
          */
          onCancel={() => router.back()}
        />
      </ThemedView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 }, // Adds spacing around the form
});
