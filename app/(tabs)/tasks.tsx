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

/*
  TasksScreen Component
  ---------------------
  This screen shows the full list of tasks. 
  It includes:
   - Filters (All, Pending, In Progress, Completed, Archived)
   - Refresh control (pull to refresh)
   - Error handling
   - Empty state messages
   - Task creation form (when adding a new task)
   - A floating button to create new tasks
*/
export default function TasksScreen() {
  // Context hooks for tasks and authentication
  const { tasks, loading, error, fetchTasks, clearError } = useTasks();
  const { accessToken } = useAuth();

  // Local UI state
  const [showCreateForm, setShowCreateForm] = useState(false); // Toggles task form
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [filters, setFilters] = useState<TasksFilter>({}); // Holds active filters

  // Load tasks whenever token or filters change
  useEffect(() => {
    if (accessToken) {
      loadTasks();
    }
  }, [accessToken, filters]);

  // Function to fetch tasks with current filters
  const loadTasks = async () => {
    try {
      await fetchTasks(filters);
    } catch (err: any) {
      Alert.alert('Error', err.message); // Show error popup if fetch fails
    }
  };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    clearError(); //  Clear old errors before refreshing
    await loadTasks();
    setRefreshing(false);
  };

  // Callback for when a new task is successfully created
  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    loadTasks(); // Refresh tasks list
  };

  // Filter options (each with label + icon + value)
  const filterOptions: { value: TaskStatus | undefined; label: string; icon: string }[] = [
    { value: undefined, label: 'All', icon: 'list.bullet' },
    { value: 'pending', label: 'Pending', icon: 'clock' },
    { value: 'in_progress', label: 'In Progress', icon: 'play' },
    { value: 'completed', label: 'Completed', icon: 'checkmark' },
    { value: 'archived', label: 'Archived', icon: 'archivebox' },
  ];

  //  Show task form if user is adding a new task
  if (showCreateForm) {
    return (
      <ProtectedRoute>
        <TaskForm
          onSubmit={handleCreateSuccess} // Refresh after success
          onCancel={() => setShowCreateForm(false)} // Close form without saving
        />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ThemedView style={styles.container}>
        {/* ================== HEADER ================== */}
        <View style={styles.header}>
          <ThemedText type="title">My Tasks</ThemedText>
        </View>

        {/* ================== FILTERS ================== */}
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
                filters.status === filter.value && styles.filterButtonActive, // Highlight active filter
              ]}
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  status: filter.value, // Update filter state
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

        {/* ================== TASK LIST ================== */}
        <ScrollView
          style={styles.tasksContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.tasksContent}
        >
          {/* Show loader while fetching */}
          {loading && !refreshing ? (
            <View style={styles.center}>
              <ThemedText>Loading tasks...</ThemedText>
            </View>
          ) : error ? (
            /* Show error message with retry option */
            <View style={styles.center}>
              <ThemedText style={styles.error}>Error: {error}</ThemedText>
              <TouchableOpacity onPress={loadTasks} style={styles.retryButton}>
                <ThemedText style={styles.retryText}>Retry</ThemedText>
              </TouchableOpacity>
            </View>
          ) : tasks.length === 0 ? (
            /* Empty state message when no tasks match filter */
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
            // ✅ Render list of TaskCards
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </ScrollView>
      </ThemedView>

      {/* ================== FLOATING ADD BUTTON ================== */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCreateForm(true)} // Open form when pressed
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
