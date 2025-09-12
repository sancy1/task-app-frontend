
// app/task/[id].tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTasks } from '@/src/contexts/TaskContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TaskForm } from '@/components/TaskForm';
import { Task } from '@/src/types/task';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks, updateTask, deleteTask, markAsCompleted, archiveTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const found = tasks.find((t) => t.id === id);
    if (found) setTask(found);
  }, [id, tasks]);

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(id!);
          router.back();
        },
      },
    ]);
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

  if (editing) {
    // ✅ normalize Task to match TaskFormProps
    const normalizedTask = {
      id: task.id,
      title: task.title ?? '',
      description: task.description ?? undefined, // fix null → undefined
      status: task.status ?? undefined,
      priority: task.priority ?? undefined,
      due_date: task.due_date ?? undefined,
    };

    return (
      <ProtectedRoute>
        <ThemedView style={{ flex: 1 }}>
          <TaskForm
            initialData={normalizedTask}
            onSubmit={async (data) => {
              await updateTask(task.id, data);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        </ThemedView>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          {task.title}
        </ThemedText>
        {task.description && (
          <ThemedText style={styles.description}>{task.description}</ThemedText>
        )}
        <View style={styles.meta}>
          <ThemedText>Status: {task.status}</ThemedText>
          <ThemedText>Priority: {task.priority}</ThemedText>
          <ThemedText>
            Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
          </ThemedText>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => setEditing(true)}>
            <IconSymbol name="pencil" size={20} color="white" />
            <ThemedText style={styles.actionText}>Edit</ThemedText>
          </TouchableOpacity>

          {task.status !== 'completed' && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#10B981' }]}
              onPress={() => markAsCompleted(task.id)}
            >
              <IconSymbol name="checkmark.circle" size={20} color="white" />
              <ThemedText style={styles.actionText}>Complete</ThemedText>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#8B5CF6' }]}
            onPress={() => archiveTask(task.id)}
          >
            <IconSymbol name="archivebox" size={20} color="white" />
            <ThemedText style={styles.actionText}>Archive</ThemedText>
          </TouchableOpacity>

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















