
// app/(tabs)/tasks.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTasks } from '@/src/contexts/TaskContext';
import { useAuth } from '@/src/contexts/AuthContext';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { TasksFilter, TaskStatus } from '@/src/types/task';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function TasksScreen() {
  const { tasks, loading, error, fetchTasks, clearError } = useTasks();
  const { accessToken } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<TasksFilter>({});

  useEffect(() => {
    if (accessToken) {
      loadTasks();
    }
  }, [accessToken, filters]);

  const loadTasks = async () => {
    try {
      await fetchTasks(filters);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    clearError(); // ✅ clear old errors
    await loadTasks();
    setRefreshing(false);
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    loadTasks();
  };

  const filterOptions: { value: TaskStatus | undefined; label: string; icon: string }[] = [
    { value: undefined, label: 'All', icon: 'list.bullet' },
    { value: 'pending', label: 'Pending', icon: 'clock' },
    { value: 'in_progress', label: 'In Progress', icon: 'play' },
    { value: 'completed', label: 'Completed', icon: 'checkmark' },
    { value: 'archived', label: 'Archived', icon: 'archivebox' },
  ];

  if (showCreateForm) {
    return (
      <ProtectedRoute>
        <TaskForm
          onSubmit={handleCreateSuccess}
          onCancel={() => setShowCreateForm(false)}
        />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ThemedView style={styles.container}>
        {/* Title */}
        <View style={styles.header}>
          <ThemedText type="title">My Tasks</ThemedText>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter.label}
              style={[
                styles.filterButton,
                filters.status === filter.value && styles.filterButtonActive,
              ]}
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  status: filter.value,
                }))
              }
            >
              <IconSymbol
                name={filter.icon}
                size={16}
                color={filters.status === filter.value ? '#007AFF' : '#6B7280'}
              />
              <ThemedText
                style={[
                  styles.filterText,
                  filters.status === filter.value && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Task list */}
        <ScrollView
          style={styles.tasksContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.tasksContent}
        >
          {loading && !refreshing ? (
            <View style={styles.center}>
              <ThemedText>Loading tasks...</ThemedText>
            </View>
          ) : error ? (
            <View style={styles.center}>
              <ThemedText style={styles.error}>Error: {error}</ThemedText>
              <TouchableOpacity onPress={loadTasks} style={styles.retryButton}>
                <ThemedText style={styles.retryText}>Retry</ThemedText>
              </TouchableOpacity>
            </View>
          ) : tasks.length === 0 ? (
            <View style={styles.center}>
              <IconSymbol
                name="list.bullet.clipboard"
                size={48}
                color="#9CA3AF"
              />
              <ThemedText style={styles.emptyText}>
                {filters.status
                  ? `No ${filters.status} tasks`
                  : 'No tasks yet'}
              </ThemedText>
              <ThemedText style={styles.emptySubtext}>
                {filters.status
                  ? 'Try changing filters'
                  : 'Create your first task to get started'}
              </ThemedText>
            </View>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </ScrollView>
      </ThemedView>

      {/* Floating Add Button at Bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCreateForm(true)}
        >
          <IconSymbol name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 60 }, // ⬅️ Added top spacing
  header: { marginBottom: 20 },
  filterContainer: { marginBottom: 20 },
  filterContent: { gap: 8, paddingRight: 16 },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#007AFF',
  },
  filterText: { fontSize: 14, color: '#6B7280' },
  filterTextActive: { color: '#007AFF', fontWeight: '600' },
  tasksContainer: { flex: 1 },
  tasksContent: { paddingBottom: 20 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 12,
  },
  error: { color: '#EF4444', textAlign: 'center' },
  retryButton: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryText: { color: 'white', fontWeight: '600' },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  emptySubtext: { color: '#9CA3AF', textAlign: 'center' },

  // Floating button at bottom right
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
