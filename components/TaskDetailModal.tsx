
// src/components/TaskDetailModal.tsx

import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Task } from '@/src/types/task';
import { useTasks } from '@/src/contexts/TaskContext';

interface TaskDetailModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible,
  task,
  onClose,
  onEdit,
}) => {
  const { deleteTask, markAsCompleted, archiveTask } = useTasks();

  if (!task) return null;

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(task.id);
          onClose();
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <IconSymbol name="xmark.circle" size={28} color="#6B7280" />
        </TouchableOpacity>

        <ThemedText type="title" style={styles.title}>{task.title}</ThemedText>
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
          <TouchableOpacity style={styles.actionBtn} onPress={() => onEdit(task)}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  closeBtn: { alignSelf: 'flex-end', marginBottom: 12 },
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
