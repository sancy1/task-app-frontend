
// components/TaskEditForm.tsx - UPDATED VERSION

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useTasks } from '@/src/contexts/TaskContext';
import { TaskStatus, TaskPriority, UpdateTaskData } from '@/src/types/task';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

interface TaskEditFormProps {
  taskId: string;
  initialData: {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: string;
  };
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  taskId,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { updateTask } = useTasks();
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialData?.status ?? 'pending');
  const [priority, setPriority] = useState<TaskPriority>(initialData?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(initialData?.due_date ?? '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    const payload: UpdateTaskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      due_date: dueDate || undefined,
    };

    setLoading(true);
    try {
      await updateTask(taskId, payload);
      onSubmit?.();
      router.back(); // Navigate back after successful update
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low', color: '#10B981' },
    { value: 'medium', label: 'Medium', color: '#F59E0B' },
    { value: 'high', label: 'High', color: '#EF4444' },
    { value: 'urgent', label: 'Urgent', color: '#DC2626' },
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: '#6B7280' },
    { value: 'in_progress', label: 'In Progress', color: '#3B82F6' },
    { value: 'completed', label: 'Completed', color: '#10B981' },
    { value: 'archived', label: 'Archived', color: '#8B5CF6' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText type="subtitle" style={styles.title}>
          Edit Task
        </ThemedText>

        <ThemedTextInput
          placeholder="Task title*"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <ThemedTextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
        />

        {/* Status */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold">Status</ThemedText>
          <View style={styles.optionsContainer}>
            {statusOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.optionButton,
                  status === opt.value && styles.optionButtonSelected,
                  { borderColor: opt.color },
                ]}
                onPress={() => setStatus(opt.value as TaskStatus)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    status === opt.value && { color: opt.color, fontWeight: '600' },
                  ]}
                >
                  {opt.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Priority */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold">Priority</ThemedText>
          <View style={styles.optionsContainer}>
            {priorityOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.optionButton,
                  priority === opt.value && styles.optionButtonSelected,
                  { borderColor: opt.color },
                ]}
                onPress={() => setPriority(opt.value as TaskPriority)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    priority === opt.value && { color: opt.color, fontWeight: '600' },
                  ]}
                >
                  {opt.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Due Date */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold">Due Date</ThemedText>
          <TouchableOpacity
            style={[styles.input, styles.dateInput]}
            onPress={() => setShowDatePicker(true)}
          >
            <ThemedText style={{ color: dueDate ? '#111' : '#9CA3AF' }}>
              {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select due date'}
            </ThemedText>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate ? new Date(dueDate) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(e, d) => {
                setShowDatePicker(false);
                if (d) setDueDate(d.toISOString());
              }}
            />
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
            <ThemedText>Cancel</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submit, (!title.trim() || loading) && styles.disabled]}
            onPress={handleSubmit}
            disabled={!title.trim() || loading}
          >
            <ThemedText style={{ color: 'white', fontWeight: '600' }}>
              {loading ? 'Updating…' : 'Update Task'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { textAlign: 'center', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  textArea: { height: 90 },
  section: { marginBottom: 20 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  optionButtonSelected: { backgroundColor: '#F3F4F6' },
  optionText: { fontSize: 14 },
  buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 12 },
  button: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cancel: { backgroundColor: '#F3F4F6' },
  submit: { backgroundColor: '#007AFF' },
  disabled: { opacity: 0.5 },
  dateInput: { justifyContent: 'center' },
});