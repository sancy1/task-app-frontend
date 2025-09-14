
// // app/(tabs)/index.tsx

import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/src/contexts/AuthContext';
import { useTasks } from '@/src/contexts/TaskContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TaskCard } from '@/components/TaskCard';
import { useRouter, useFocusEffect } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

/*
  HomeTab Component
  -----------------
  This is the main "Dashboard" screen that users see after logging in.
  It pulls in the user data (from AuthContext), tasks (from TaskContext),
  and displays:
   - A welcome message with profile avatar
   - Task statistics (total + completed)
   - A preview list of recent tasks
   - A floating button to create a new task
*/
export default function HomeTab() {
  const { user, accessToken } = useAuth(); // Access logged-in user and their token
  const { tasks, fetchTasks } = useTasks(); // Access all tasks and the fetch function
  const router = useRouter(); // For navigating between screens

  //  Fetch tasks whenever the accessToken changes (e.g., after login)
  useEffect(() => {
    if (accessToken) fetchTasks();
  }, [accessToken]);

  //  Re-fetch tasks whenever this screen regains focus (ensures data is always fresh)
  useFocusEffect(
    useCallback(() => {
      if (accessToken) fetchTasks();
    }, [accessToken])
  );

  // Take the first 3 tasks to display under "Recent Tasks"
  const recentTasks = tasks.slice(0, 3);

  // 🔹 Extract initials from user's first and last name (for profile avatar text)
  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase();

  return (
    // Protect this route: only logged-in users can see it
    <ProtectedRoute>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* ================== HEADER ================== */}
        <View style={styles.header}>
          {/* Welcome Message */}
          <View>
            <ThemedText type="title">Welcome, {user?.first_name || 'User'}!</ThemedText>
            <ThemedText style={styles.subtitle}>Here's your dashboard</ThemedText>
          </View>

          {/* 🔹 Profile Avatar Button → navigates to Profile page */}
          <TouchableOpacity onPress={() => router.push('/profile')} style={styles.avatar}>
            <ThemedText style={styles.avatarText}>{initials}</ThemedText>
          </TouchableOpacity>
        </View>

        {/* ================== STATS CARDS ================== */}
        <View style={styles.statsContainer}>
          {/* Total Tasks */}
          <View style={styles.statCard}>
            <IconSymbol name="list.bullet" size={24} color="#007AFF" />
            <ThemedText type="title">{tasks.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>

          {/* Completed Tasks */}
          <View style={styles.statCard}>
            <IconSymbol name="checkmark.circle" size={24} color="#10B981" />
            <ThemedText type="title">
              {tasks.filter((t) => t.status === 'completed').length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Completed</ThemedText>
          </View>
        </View>

        {/* ================== RECENT TASKS ================== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText type="subtitle">Recent Tasks</ThemedText>

            {/* "See All" button → navigates to full task list page */}
            <TouchableOpacity onPress={() => router.push('/(tabs)/tasks')}>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>

          {/* If no tasks exist, show an empty state message */}
          {recentTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="list.bullet.clipboard" size={32} color="#9CA3AF" />
              <ThemedText style={styles.emptyText}>No tasks yet</ThemedText>
              <ThemedText style={styles.emptySubtext}>Create your first task to get started</ThemedText>
            </View>
          ) : (
            // Otherwise, map through and render TaskCard components
            recentTasks.map(task => <TaskCard key={task.id} task={task} />)
          )}
        </View>
      </ScrollView>

      {/* ================== FLOATING ADD BUTTON ================== */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() => router.push('/task/new')} // Navigate to "Create Task" page
          style={styles.addButton}
        >
          <IconSymbol name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 60 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 24 
  },
  subtitle: { color: '#6B7280', marginTop: 4 },

  // 🔹 Avatar styles
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#007AFF', fontWeight: '700' },

  // 🔹 Stats
  statsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: Platform.select({ ios: 'rgba(255,255,255,0.1)', default: 'white' }),
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width:0, height:1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: { color: '#6B7280', fontSize: 14 },

  // 🔹 Task card
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width:0, height:2 },
    shadowOpacity:0.1,
    shadowRadius:4,
    elevation:3,
    gap: 12,
  },
  cardHeader: { flexDirection: 'row', justifyContent:'space-between', alignItems:'center' },
  seeAllText: { color: '#007AFF', fontWeight: '600' },
  emptyState: { alignItems:'center', padding:20, gap:8 },
  emptyText: { color:'#6B7280', fontWeight:'600' },
  emptySubtext: { color:'#9CA3AF', fontSize:14, textAlign:'center' },

  // Floating button
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
