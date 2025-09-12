
// // app/task/[id]/edit.tsx

// // app/task/[id]/edit.tsx
// if (__DEV__) {
//   console.log('>>> Rendering Task Edit page');
// }

// import React, { useEffect, useState } from 'react';
// import { StyleSheet } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedText } from '@/components/ThemedText';
// import { ProtectedRoute } from '@/components/ProtectedRoute';
// import { useTasks } from '@/src/contexts/TaskContext';
// import { TaskForm, TaskFormValues } from '@/components/TaskForm';
// import { Task } from '@/src/types/task';

// export default function TaskEditScreen() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const { tasks, updateTask } = useTasks();
//   const [task, setTask] = useState<Task | null>(null);

//   useEffect(() => {
//     const found = tasks.find((t) => t.id === id);
//     if (found) setTask(found);
//   }, [id, tasks]);

//   if (!task) {
//     return (
//       <ProtectedRoute>
//         <ThemedView style={styles.center}>
//           <ThemedText>Task not found</ThemedText>
//         </ThemedView>
//       </ProtectedRoute>
//     );
//   }

//   // Normalize Task → TaskFormValues
//   const normalizedTask: Partial<TaskFormValues> = {
//     id: task.id,
//     title: task.title ?? '',
//     description: task.description ?? undefined,
//     status: task.status ?? undefined,
//     priority: task.priority ?? undefined,
//     due_date: task.due_date ?? undefined,
//   };

//   return (
//     <ProtectedRoute>
//       <ThemedView style={{ flex: 1 }}>
//         <TaskForm
//           mode="update"
//           initialData={normalizedTask}
//           onSubmit={async (data) => {
//             await updateTask(task.id, data);
//             router.replace(`/task/${task.id}`);
//           }}
//           onCancel={() => router.back()}
//         />
//       </ThemedView>
//     </ProtectedRoute>
//   );
// }

// const styles = StyleSheet.create({
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });
