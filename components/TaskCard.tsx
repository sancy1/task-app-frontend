// // src/components/TaskCard.tsx

// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Task } from '@/src/types/task';
// import { useTasks } from '@/src/contexts/TaskContext';
// import { IconSymbol } from '@/components/ui/IconSymbol';

// interface TaskCardProps {
//   task: Task;
//   onPress?: () => void;
// }

// const priorityColors = {
//   low: '#10B981',
//   medium: '#F59E0B',
//   high: '#EF4444',
//   urgent: '#DC2626',
// };

// // ✅ Use plain string instead of SFSymbols6_0
// const statusIcons: Record<Task['status'], string> = {
//   pending: 'clock.fill',
//   in_progress: 'play.fill',
//   completed: 'checkmark.circle.fill',
//   archived: 'archivebox.fill',
// };

// const statusColors = {
//   pending: '#6B7280',
//   in_progress: '#3B82F6',
//   completed: '#10B981',
//   archived: '#8B5CF6',
// };

// export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
//   const { markAsCompleted, deleteTask, archiveTask } = useTasks();

//   const handleComplete = async () => {
//     try {
//       await markAsCompleted(task.id);
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleDelete = () => {
//     Alert.alert(
//       'Delete Task',
//       'Are you sure you want to delete this task?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await deleteTask(task.id);
//             } catch (error: any) {
//               Alert.alert('Error', error.message);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleArchive = async () => {
//     try {
//       await archiveTask(task.id);
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return 'No due date';
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <ThemedView style={styles.card}>
//       <TouchableOpacity onPress={onPress} style={styles.content}>
//         <View style={styles.header}>
//           <View style={styles.statusContainer}>
//             <IconSymbol
//               name={statusIcons[task.status]} // ✅ Now just a string
//               size={16}
//               color={statusColors[task.status]}
//             />
//             <ThemedText
//               style={[styles.statusText, { color: statusColors[task.status] }]}
//             >
//               {task.status.replace('_', ' ')}
//             </ThemedText>
//           </View>

//           <View
//             style={[
//               styles.priorityBadge,
//               { backgroundColor: `${priorityColors[task.priority]}20` },
//             ]}
//           >
//             <ThemedText
//               style={[styles.priorityText, { color: priorityColors[task.priority] }]}
//             >
//               {task.priority}
//             </ThemedText>
//           </View>
//         </View>

//         <ThemedText type="defaultSemiBold" style={styles.title}>
//           {task.title}
//         </ThemedText>

//         {task.description && (
//           <ThemedText style={styles.description} numberOfLines={2}>
//             {task.description}
//           </ThemedText>
//         )}

//         <View style={styles.footer}>
//           <ThemedText style={styles.date}>{formatDate(task.due_date)}</ThemedText>

//           <View style={styles.actions}>
//             {task.status !== 'completed' && (
//               <TouchableOpacity onPress={handleComplete} style={styles.actionButton}>
//                 <IconSymbol name="checkmark.circle.fill" size={20} color="#10B981" />
//               </TouchableOpacity>
//             )}

//             {task.status !== 'archived' && (
//               <TouchableOpacity onPress={handleArchive} style={styles.actionButton}>
//                 <IconSymbol name="archivebox.fill" size={20} color="#8B5CF6" />
//               </TouchableOpacity>
//             )}

//             <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
//               <IconSymbol name="trash.fill" size={20} color="#EF4444" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 16,
//     marginBottom: 12,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   content: {
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'capitalize',
//   },
//   priorityBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   priorityText: {
//     fontSize: 11,
//     fontWeight: '700',
//     textTransform: 'capitalize',
//   },
//   title: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 12,
//     lineHeight: 20,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   date: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   actions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   actionButton: {
//     padding: 4,
//   },
// });






















// src/components/TaskCard.tsx

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Task } from '@/src/types/task';
import { useTasks } from '@/src/contexts/TaskContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TaskForm } from './TaskForm';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
}

const priorityColors = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
  urgent: '#DC2626',
};

const statusIcons: Record<Task['status'], string> = {
  pending: 'clock.fill',
  in_progress: 'play.fill',
  completed: 'checkmark.circle.fill',
  archived: 'archivebox.fill',
};

const statusColors = {
  pending: '#6B7280',
  in_progress: '#3B82F6',
  completed: '#10B981',
  archived: '#8B5CF6',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
  const { markAsCompleted, deleteTask, archiveTask, updateTask } = useTasks();

  const [expanded, setExpanded] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleComplete = async () => {
    try {
      await markAsCompleted(task.id);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(task.id);
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  const handleArchive = async () => {
    try {
      await archiveTask(task.id);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

const handleEdit = async (data: Partial<Task>) => {
  try {
    // ✅ Normalize null values
    const payload = {
      ...data,
      description: data.description ?? undefined,
      due_date: data.due_date ?? undefined,
    };

    await updateTask(task.id, payload);
    setShowEditForm(false);
  } catch (error: any) {
    Alert.alert('Error', error.message);
  }
};


  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <ThemedView style={styles.card}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.content}>
          <View style={styles.header}>
            <View style={styles.statusContainer}>
              <IconSymbol name={statusIcons[task.status]} size={16} color={statusColors[task.status]} />
              <ThemedText style={[styles.statusText, { color: statusColors[task.status] }]}>
                {task.status.replace('_', ' ')}
              </ThemedText>
            </View>

            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: `${priorityColors[task.priority]}20` },
              ]}
            >
              <ThemedText style={[styles.priorityText, { color: priorityColors[task.priority] }]}>
                {task.priority}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="defaultSemiBold" style={styles.title}>
            {task.title}
          </ThemedText>

          {task.description && (
            <ThemedText style={styles.description} numberOfLines={expanded ? 0 : 2}>
              {task.description}
            </ThemedText>
          )}

          <View style={styles.footer}>
            <ThemedText style={styles.date}>{formatDate(task.due_date)}</ThemedText>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setShowEditForm(true)} style={styles.actionButton}>
                <IconSymbol name="pencil" size={20} color="#F59E0B" />
              </TouchableOpacity>

              {task.status !== 'completed' && (
                <TouchableOpacity onPress={handleComplete} style={styles.actionButton}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color="#10B981" />
                </TouchableOpacity>
              )}

              {task.status !== 'archived' && (
                <TouchableOpacity onPress={handleArchive} style={styles.actionButton}>
                  <IconSymbol name="archivebox.fill" size={20} color="#8B5CF6" />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
                <IconSymbol name="trash.fill" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </ThemedView>

      {/* Edit Task Modal */}
      <Modal visible={showEditForm} animationType="slide">
        <ThemedView style={{ flex: 1 }}>
          <TaskForm
            initialData={{
              title: task.title,
              description: task.description || '',
              priority: task.priority,
              status: task.status,
              due_date: task.due_date || '',
            }}
            onSubmit={() => handleEdit({})}
            onCancel={() => setShowEditForm(false)}
          />
        </ThemedView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});
