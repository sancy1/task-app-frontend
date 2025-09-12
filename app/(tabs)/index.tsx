
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

export default function HomeTab() {
  const { user, accessToken } = useAuth();
  const { tasks, fetchTasks } = useTasks();
  const router = useRouter();

  // ✅ Fetch tasks when accessToken changes
  useEffect(() => {
    if (accessToken) fetchTasks();
  }, [accessToken]);

  // ✅ Re-fetch tasks whenever the Home tab is focused
  useFocusEffect(
    useCallback(() => {
      if (accessToken) fetchTasks();
    }, [accessToken])
  );

  const recentTasks = tasks.slice(0, 3);

  // 🔹 Get initials for profile avatar
  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase();

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Header with Profile */}
        <View style={styles.header}>
          <View>
            <ThemedText type="title">Welcome, {user?.first_name || 'User'}!</ThemedText>
            <ThemedText style={styles.subtitle}>Here's your dashboard</ThemedText>
          </View>

          {/* 🔹 Profile Avatar Button */}
          <TouchableOpacity onPress={() => router.push('/profile')} style={styles.avatar}>
            <ThemedText style={styles.avatarText}>{initials}</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 🔹 Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <IconSymbol name="list.bullet" size={24} color="#007AFF" />
            <ThemedText type="title">{tasks.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="checkmark.circle" size={24} color="#10B981" />
            <ThemedText type="title">
              {tasks.filter((t) => t.status === 'completed').length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Completed</ThemedText>
          </View>
        </View>

        {/* Recent Tasks Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText type="subtitle">Recent Tasks</ThemedText>
            <TouchableOpacity onPress={() => router.push('/(tabs)/tasks')}>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>

          {recentTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="list.bullet.clipboard" size={32} color="#9CA3AF" />
              <ThemedText style={styles.emptyText}>No tasks yet</ThemedText>
              <ThemedText style={styles.emptySubtext}>Create your first task to get started</ThemedText>
            </View>
          ) : (
            recentTasks.map(task => <TaskCard key={task.id} task={task} />)
          )}
        </View>
      </ScrollView>

      {/* Floating Add Button at Bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() => router.push('/task/new')}
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
