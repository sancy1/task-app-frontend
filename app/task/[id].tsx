
// app/task/[id].tsx

/*
  TaskDetailScreen
  ----------------
  This screen shows the details of a single task.

  - Gets the task ID from the route parameter (/task/[id])
  - Looks up the task in the global tasks context
  - Displays the task details: title, description, status, priority, due date
  - Provides action buttons: Edit, Mark as Complete, Archive, and Delete
  - Handles "task not found" gracefully
*/

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTasks } from '@/src/contexts/TaskContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Task } from '@/src/types/task';

export default function TaskDetailScreen() {
  // Get the dynamic :id param from route
  const { id } = useLocalSearchParams<{ id: string }>();

  // Router instance for navigation
  const router = useRouter();

  // Task context with available actions
  const { tasks, deleteTask, markAsCompleted, archiveTask } = useTasks();

  // Local state to hold the selected task
  const [task, setTask] = useState<Task | null>(null);

  // When tasks or ID changes, update the selected task
  useEffect(() => {
    const found = tasks.find((t) => t.id === id);
    if (found) setTask(found);
  }, [id, tasks]);

  // Handle deleting the task (with confirmation)
  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(id!); // call delete function from context
          router.back(); // go back after deletion
        },
      },
    ]);
  };

  // If no matching task was found
  if (!task) {
    return (
      <ProtectedRoute>
        <ThemedView style={styles.center}>
          <ThemedText>Task not found</ThemedText>
        </ThemedView>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        {/* Task Title */}
        <ThemedText type="title" style={styles.title}>
          {task.title}
        </ThemedText>

        {/* Task Description (if available) */}
        {task.description && (
          <ThemedText style={styles.description}>{task.description}</ThemedText>
        )}

        {/* Task Metadata */}
        <View style={styles.meta}>
          <ThemedText>Status: {task.status}</ThemedText>
          <ThemedText>Priority: {task.priority}</ThemedText>
          <ThemedText>
            Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
          </ThemedText>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {/* Edit Task */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push(`/task/${task.id}/edit`)}
          >
            <IconSymbol name="pencil" size={20} color="white" />
            <ThemedText style={styles.actionText}>Edit</ThemedText>
          </TouchableOpacity>

          {/* Complete Task (only if not already completed) */}
          {task.status !== 'completed' && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#10B981' }]}
              onPress={() => markAsCompleted(task.id)}
            >
              <IconSymbol name="checkmark.circle" size={20} color="white" />
              <ThemedText style={styles.actionText}>Complete</ThemedText>
            </TouchableOpacity>
          )}

          {/* Archive Task */}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#8B5CF6' }]}
            onPress={() => archiveTask(task.id)}
          >
            <IconSymbol name="archivebox" size={20} color="white" />
            <ThemedText style={styles.actionText}>Archive</ThemedText>
          </TouchableOpacity>

          {/* Delete Task */}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#EF4444' }]}
            onPress={handleDelete}
          >
            <IconSymbol name="trash" size={20} color="white" />
            <ThemedText style={styles.actionText}>Delete</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { marginBottom: 12 },
  description: { fontSize: 16, color: '#374151', marginBottom: 20, lineHeight: 22 },
  meta: { gap: 6, marginBottom: 20 },
  actions: { gap: 12 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
  },
  actionText: { color: 'white', fontWeight: '600' },
});


























