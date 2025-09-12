
// // src/components/TaskForm.tsx

// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedTextInput } from '@/components/ThemedTextInput';
// import { useTasks } from '@/src/contexts/TaskContext';
// import { TaskStatus, TaskPriority } from '@/src/types/task';
// import DateTimePicker from '@react-native-community/datetimepicker'; // ✅ for better UX

// interface TaskFormProps {
//   onSubmit?: () => void;
//   onCancel?: () => void;
//   initialData?: {
//     title?: string;
//     description?: string;
//     status?: TaskStatus;
//     priority?: TaskPriority;
//     due_date?: string;
//   };
// }

// export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
//   const [title, setTitle] = useState(initialData?.title || '');
//   const [description, setDescription] = useState(initialData?.description || '');
//   const [priority, setPriority] = useState<TaskPriority>(initialData?.priority || 'medium');
//   const [dueDate, setDueDate] = useState(initialData?.due_date || '');
//   const [showDatePicker, setShowDatePicker] = useState(false); // ✅ controls calendar
//   const [loading, setLoading] = useState(false);
//   const { createTask } = useTasks();

//   const handleSubmit = async () => {
//     if (!title.trim()) {
//       Alert.alert('Error', 'Title is required');
//       return;
//     }

//     setLoading(true);
//     try {
//       await createTask({
//         title: title.trim(),
//         description: description.trim() || undefined,
//         priority,
//         due_date: dueDate || undefined,
//       });

//       // Reset fields after submission
//       setTitle('');
//       setDescription('');
//       setPriority('medium');
//       setDueDate('');

//       onSubmit?.();
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
//     { value: 'low', label: 'Low', color: '#10B981' },
//     { value: 'medium', label: 'Medium', color: '#F59E0B' },
//     { value: 'high', label: 'High', color: '#EF4444' },
//     { value: 'urgent', label: 'Urgent', color: '#DC2626' },
//   ];

//   return (
//     <ThemedView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <ThemedText type="subtitle" style={styles.title}>
//           Create New Task
//         </ThemedText>

//         <ThemedTextInput
//           placeholder="Task title*"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//           maxLength={255}
//         />

//         <ThemedTextInput
//           placeholder="Description (optional)"
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//           numberOfLines={4}
//           textAlignVertical="top"
//           maxLength={1000}
//         />

//         {/* Priority selection */}
//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Priority
//           </ThemedText>
//           <View style={styles.priorityContainer}>
//             {priorityOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.value}
//                 style={[
//                   styles.priorityOption,
//                   priority === option.value && styles.priorityOptionSelected,
//                   { borderColor: option.color },
//                 ]}
//                 onPress={() => setPriority(option.value)}
//               >
//                 <ThemedText
//                   style={[
//                     styles.priorityText,
//                     priority === option.value && { color: option.color },
//                   ]}
//                 >
//                   {option.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Due Date Picker */}
//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <ThemedText style={{ color: dueDate ? '#111' : '#9CA3AF' }}>
//             {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date'}
//           </ThemedText>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate ? new Date(dueDate) : new Date()}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) {
//                 setDueDate(selectedDate.toISOString());
//               }
//             }}
//           />
//         )}

//         {/* Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, styles.cancelButton]}
//             onPress={onCancel}
//             disabled={loading}
//           >
//             <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.button,
//               styles.submitButton,
//               (!title.trim() || loading) && styles.buttonDisabled,
//             ]}
//             onPress={handleSubmit}
//             disabled={!title.trim() || loading}
//           >
//             <ThemedText style={styles.submitButtonText}>
//               {loading ? 'Creating...' : 'Create Task'}
//             </ThemedText>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   textArea: {
//     height: 100,
//     paddingTop: 12,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   priorityContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   priorityOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 2,
//     backgroundColor: 'white',
//   },
//   priorityOptionSelected: {
//     backgroundColor: '#F3F4F6',
//   },
//   priorityText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     gap: 12,
//     marginTop: 8,
//   },
//   button: {
//     flex: 1,
//     height: 50,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cancelButton: {
//     backgroundColor: '#F3F4F6',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   submitButton: {
//     backgroundColor: '#007AFF',
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   cancelButtonText: {
//     color: '#374151',
//     fontWeight: '600',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });



















// // // src/components/TaskForm.tsx

// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedTextInput } from '@/components/ThemedTextInput';
// import { useTasks } from '@/src/contexts/TaskContext';
// import { TaskStatus, TaskPriority } from '@/src/types/task';
// import DateTimePicker from '@react-native-community/datetimepicker';

// interface TaskFormProps {
//   onSubmit?: () => void;
//   onCancel?: () => void;
//   initialData?: {
//     id?: string;
//     title?: string;
//     description?: string;
//     status?: TaskStatus;
//     priority?: TaskPriority;
//     due_date?: string;
//   };
// }

// export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
//   const [title, setTitle] = useState(initialData?.title || '');
//   const [description, setDescription] = useState(initialData?.description || '');
//   const [priority, setPriority] = useState<TaskPriority>(initialData?.priority || 'medium');
//   const [dueDate, setDueDate] = useState(initialData?.due_date || '');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { createTask, updateTask } = useTasks();

//   const isEditing = Boolean(initialData?.id);

//   const handleSubmit = async () => {
//     if (!title.trim()) {
//       Alert.alert('Error', 'Title is required');
//       return;
//     }

//     setLoading(true);
//     try {
//       if (isEditing && initialData?.id) {
//         await updateTask(initialData.id, {
//           title: title.trim(),
//           description: description.trim() || undefined,
//           priority,
//           due_date: dueDate || undefined,
//         });
//       } else {
//         await createTask({
//           title: title.trim(),
//           description: description.trim() || undefined,
//           priority,
//           due_date: dueDate || undefined,
//         });
//       }

//       onSubmit?.();
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
//     { value: 'low', label: 'Low', color: '#10B981' },
//     { value: 'medium', label: 'Medium', color: '#F59E0B' },
//     { value: 'high', label: 'High', color: '#EF4444' },
//     { value: 'urgent', label: 'Urgent', color: '#DC2626' },
//   ];

//   return (
//     <ThemedView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <ThemedText type="subtitle" style={styles.title}>
//           {isEditing ? 'Edit Task' : 'Create New Task'}
//         </ThemedText>

//         <ThemedTextInput
//           placeholder="Task title*"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//           maxLength={255}
//         />

//         <ThemedTextInput
//           placeholder="Description (optional)"
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//           numberOfLines={4}
//           textAlignVertical="top"
//           maxLength={1000}
//         />

//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Priority
//           </ThemedText>
//           <View style={styles.priorityContainer}>
//             {priorityOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.value}
//                 style={[
//                   styles.priorityOption,
//                   priority === option.value && styles.priorityOptionSelected,
//                   { borderColor: option.color },
//                 ]}
//                 onPress={() => setPriority(option.value)}
//               >
//                 <ThemedText
//                   style={[
//                     styles.priorityText,
//                     priority === option.value && { color: option.color },
//                   ]}
//                 >
//                   {option.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
//           <ThemedText style={{ color: dueDate ? '#111' : '#9CA3AF' }}>
//             {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date'}
//           </ThemedText>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate ? new Date(dueDate) : new Date()}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) {
//                 setDueDate(selectedDate.toISOString());
//               }
//             }}
//           />
//         )}

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, styles.cancelButton]}
//             onPress={onCancel}
//             disabled={loading}
//           >
//             <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.button,
//               styles.submitButton,
//               (!title.trim() || loading) && styles.buttonDisabled,
//             ]}
//             onPress={handleSubmit}
//             disabled={!title.trim() || loading}
//           >
//             <ThemedText style={styles.submitButtonText}>
//               {loading ? (isEditing ? 'Updating...' : 'Creating...') : isEditing ? 'Update Task' : 'Create Task'}
//             </ThemedText>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   scrollView: { flex: 1 },
//   title: { textAlign: 'center', marginBottom: 24 },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   textArea: { height: 100, paddingTop: 12 },
//   section: { marginBottom: 20 },
//   sectionTitle: { marginBottom: 12, fontSize: 16 },
//   priorityContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
//   priorityOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 2,
//     backgroundColor: 'white',
//   },
//   priorityOptionSelected: { backgroundColor: '#F3F4F6' },
//   priorityText: { fontSize: 14, fontWeight: '600' },
//   buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 8 },
//   button: { flex: 1, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
//   cancelButton: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
//   submitButton: { backgroundColor: '#007AFF' },
//   buttonDisabled: { opacity: 0.6 },
//   cancelButtonText: { color: '#374151', fontWeight: '600' },
//   submitButtonText: { color: 'white', fontWeight: '600' },
// });























// // src/components/TaskForm.tsx

// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedTextInput } from '@/components/ThemedTextInput';
// import { useTasks } from '@/src/contexts/TaskContext';
// import { TaskStatus, TaskPriority } from '@/src/types/task';
// import DateTimePicker from '@react-native-community/datetimepicker';

// // ✅ Define form values shape for external usage
// export interface TaskFormValues {
//   id?: string;
//   title: string; // 🔥 make required here
//   description?: string;
//   status?: TaskStatus;
//   priority?: TaskPriority;
//   due_date?: string;
// }

// interface TaskFormProps {
//   onSubmit?: (data: TaskFormValues) => void | Promise<void>;
//   onCancel?: () => void;
//   initialData?: Partial<TaskFormValues>;
// }

// export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
//   const [title, setTitle] = useState(initialData?.title ?? '');
//   const [description, setDescription] = useState(initialData?.description ?? '');
//   const [priority, setPriority] = useState<TaskPriority>(initialData?.priority ?? 'medium');
//   const [dueDate, setDueDate] = useState(initialData?.due_date ?? '');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { createTask, updateTask } = useTasks();

//   const isEditing = Boolean(initialData?.id);

//   const handleSubmit = async () => {
//     if (!title.trim()) {
//       Alert.alert('Error', 'Title is required');
//       return;
//     }

//     // ✅ payload always satisfies CreateTaskData / UpdateTaskData
//     const payload: TaskFormValues = {
//       title: title.trim(),
//       description: description.trim() || undefined,
//       priority,
//       due_date: dueDate || undefined,
//       id: initialData?.id,
//       status: initialData?.status,
//     };

//     setLoading(true);
//     try {
//       if (isEditing && initialData?.id) {
//         await updateTask(initialData.id, payload);
//       } else {
//         await createTask(payload);
//       }

//       await onSubmit?.(payload); // ✅ now valid
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
//     { value: 'low', label: 'Low', color: '#10B981' },
//     { value: 'medium', label: 'Medium', color: '#F59E0B' },
//     { value: 'high', label: 'High', color: '#EF4444' },
//     { value: 'urgent', label: 'Urgent', color: '#DC2626' },
//   ];

//   return (
//     <ThemedView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <ThemedText type="subtitle" style={styles.title}>
//           {isEditing ? 'Edit Task' : 'Create New Task'}
//         </ThemedText>

//         <ThemedTextInput
//           placeholder="Task title*"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//           maxLength={255}
//         />

//         <ThemedTextInput
//           placeholder="Description (optional)"
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//           numberOfLines={4}
//           textAlignVertical="top"
//           maxLength={1000}
//         />

//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Priority
//           </ThemedText>
//           <View style={styles.priorityContainer}>
//             {priorityOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.value}
//                 style={[
//                   styles.priorityOption,
//                   priority === option.value && styles.priorityOptionSelected,
//                   { borderColor: option.color },
//                 ]}
//                 onPress={() => setPriority(option.value)}
//               >
//                 <ThemedText
//                   style={[
//                     styles.priorityText,
//                     priority === option.value && { color: option.color },
//                   ]}
//                 >
//                   {option.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
//           <ThemedText style={{ color: dueDate ? '#111' : '#9CA3AF' }}>
//             {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date'}
//           </ThemedText>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate ? new Date(dueDate) : new Date()}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) {
//                 setDueDate(selectedDate.toISOString());
//               }
//             }}
//           />
//         )}

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, styles.cancelButton]}
//             onPress={onCancel}
//             disabled={loading}
//           >
//             <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.button,
//               styles.submitButton,
//               (!title.trim() || loading) && styles.buttonDisabled,
//             ]}
//             onPress={handleSubmit}
//             disabled={!title.trim() || loading}
//           >
//             <ThemedText style={styles.submitButtonText}>
//               {loading
//                 ? isEditing
//                   ? 'Updating...'
//                   : 'Creating...'
//                 : isEditing
//                 ? 'Update Task'
//                 : 'Create Task'}
//             </ThemedText>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   scrollView: { flex: 1 },
//   title: { textAlign: 'center', marginBottom: 24 },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   textArea: { height: 100, paddingTop: 12 },
//   section: { marginBottom: 20 },
//   sectionTitle: { marginBottom: 12, fontSize: 16 },
//   priorityContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
//   priorityOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 2,
//     backgroundColor: 'white',
//   },
//   priorityOptionSelected: { backgroundColor: '#F3F4F6' },
//   priorityText: { fontSize: 14, fontWeight: '600' },
//   buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 8 },
//   button: { flex: 1, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
//   cancelButton: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
//   submitButton: { backgroundColor: '#007AFF' },
//   buttonDisabled: { opacity: 0.6 },
//   cancelButtonText: { color: '#374151', fontWeight: '600' },
//   submitButtonText: { color: 'white', fontWeight: '600' },
// });





























// // src/components/TaskForm.tsx

// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedTextInput } from '@/components/ThemedTextInput';
// import { useTasks } from '@/src/contexts/TaskContext';
// import { TaskStatus, TaskPriority } from '@/src/types/task';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export interface TaskFormValues {
//   id?: string;
//   title: string;
//   description?: string;
//   status?: TaskStatus;     // ✅ keep status
//   priority?: TaskPriority;
//   due_date?: string;
// }

// interface TaskFormProps {
//   onSubmit?: (data: TaskFormValues) => void | Promise<void>;
//   onCancel?: () => void;
//   initialData?: Partial<TaskFormValues>;
// }

// export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
//   const [title, setTitle] = useState(initialData?.title ?? '');
//   const [description, setDescription] = useState(initialData?.description ?? '');
//   const [priority, setPriority] = useState<TaskPriority>(initialData?.priority ?? 'medium');
//   const [status, setStatus] = useState<TaskStatus>(initialData?.status ?? 'pending'); // ✅ default pending
//   const [dueDate, setDueDate] = useState(initialData?.due_date ?? '');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { createTask, updateTask } = useTasks();
//   const isEditing = Boolean(initialData?.id);

//   const handleSubmit = async () => {
//     if (!title.trim()) {
//       Alert.alert('Error', 'Title is required');
//       return;
//     }

//     const payload: TaskFormValues = {
//       title: title.trim(),
//       description: description.trim() || undefined,
//       priority,
//       status,   // ✅ include status in payload
//       due_date: dueDate || undefined,
//       id: initialData?.id,
//     };

//     setLoading(true);
//     try {
//       if (isEditing && initialData?.id) {
//         await updateTask(initialData.id, payload);
//       } else {
//         await createTask(payload);
//       }
//       await onSubmit?.(payload);
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
//     { value: 'low', label: 'Low', color: '#10B981' },
//     { value: 'medium', label: 'Medium', color: '#F59E0B' },
//     { value: 'high', label: 'High', color: '#EF4444' },
//     { value: 'urgent', label: 'Urgent', color: '#DC2626' },
//   ];

//   // ✅ add status options
// const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
//   { value: 'pending', label: 'Pending', color: '#F59E0B' },
//   { value: 'in_progress', label: 'In Progress', color: '#3B82F6' }, // ✅ match TaskStatus type
//   { value: 'completed', label: 'Completed', color: '#10B981' },
//   { value: 'archived', label: 'Archived', color: '#6B7280' },
// ];

//   return (
//     <ThemedView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <ThemedText type="subtitle" style={styles.title}>
//           {isEditing ? 'Edit Task' : 'Create New Task'}
//         </ThemedText>

//         <ThemedTextInput
//           placeholder="Task title*"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//           maxLength={255}
//         />

//         <ThemedTextInput
//           placeholder="Description (optional)"
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//           numberOfLines={4}
//           textAlignVertical="top"
//           maxLength={1000}
//         />

//         {/* ✅ Status Selector */}
//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Status
//           </ThemedText>
//           <View style={styles.priorityContainer}>
//             {statusOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.value}
//                 style={[
//                   styles.priorityOption,
//                   status === option.value && styles.priorityOptionSelected,
//                   { borderColor: option.color },
//                 ]}
//                 onPress={() => setStatus(option.value)}
//               >
//                 <ThemedText
//                   style={[
//                     styles.priorityText,
//                     status === option.value && { color: option.color },
//                   ]}
//                 >
//                   {option.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Priority Selector */}
//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Priority
//           </ThemedText>
//           <View style={styles.priorityContainer}>
//             {priorityOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.value}
//                 style={[
//                   styles.priorityOption,
//                   priority === option.value && styles.priorityOptionSelected,
//                   { borderColor: option.color },
//                 ]}
//                 onPress={() => setPriority(option.value)}
//               >
//                 <ThemedText
//                   style={[
//                     styles.priorityText,
//                     priority === option.value && { color: option.color },
//                   ]}
//                 >
//                   {option.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Due Date */}
//         <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
//           <ThemedText style={{ color: dueDate ? '#111' : '#9CA3AF' }}>
//             {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date'}
//           </ThemedText>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate ? new Date(dueDate) : new Date()}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) {
//                 setDueDate(selectedDate.toISOString());
//               }
//             }}
//           />
//         )}

//         {/* Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, styles.cancelButton]}
//             onPress={onCancel}
//             disabled={loading}
//           >
//             <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.button,
//               styles.submitButton,
//               (!title.trim() || loading) && styles.buttonDisabled,
//             ]}
//             onPress={handleSubmit}
//             disabled={!title.trim() || loading}
//           >
//             <ThemedText style={styles.submitButtonText}>
//               {loading
//                 ? isEditing
//                   ? 'Updating...'
//                   : 'Creating...'
//                 : isEditing
//                 ? 'Update Task'
//                 : 'Create Task'}
//             </ThemedText>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   scrollView: { flex: 1 },
//   title: { textAlign: 'center', marginBottom: 24 },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   textArea: { height: 100, paddingTop: 12 },
//   section: { marginBottom: 20 },
//   sectionTitle: { marginBottom: 12, fontSize: 16 },
//   priorityContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
//   priorityOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 2,
//     backgroundColor: 'white',
//   },
//   priorityOptionSelected: { backgroundColor: '#F3F4F6' },
//   priorityText: { fontSize: 14, fontWeight: '600' },
//   buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 8 },
//   button: { flex: 1, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
//   cancelButton: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
//   submitButton: { backgroundColor: '#007AFF' },
//   buttonDisabled: { opacity: 0.6 },
//   cancelButtonText: { color: '#374151', fontWeight: '600' },
//   submitButtonText: { color: 'white', fontWeight: '600' },
// });























// // src/components/TaskForm.tsx

// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedTextInput } from '@/components/ThemedTextInput';
// import { useTasks } from '@/src/contexts/TaskContext';
// import { TaskStatus, TaskPriority } from '@/src/types/task';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { IconSymbol } from '@/components/ui/IconSymbol';

// // ✅ Define form values shape for external usage
// export interface TaskFormValues {
//   id?: string;
//   title: string;
//   description?: string;
//   status?: TaskStatus;
//   priority?: TaskPriority;
//   due_date?: string;
// }

// interface TaskFormProps {
//   onSubmit?: (data: TaskFormValues) => void | Promise<void>;
//   onCancel?: () => void;
//   initialData?: Partial<TaskFormValues>;
// }

// export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
//   const [title, setTitle] = useState(initialData?.title ?? '');
//   const [description, setDescription] = useState(initialData?.description ?? '');
//   const [status, setStatus] = useState<TaskStatus>(initialData?.status ?? 'pending');
//   const [priority, setPriority] = useState<TaskPriority>(initialData?.priority ?? 'medium');
//   const [dueDate, setDueDate] = useState(initialData?.due_date ?? '');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { createTask, updateTask } = useTasks();

//   const isEditing = Boolean(initialData?.id);

//   const handleSubmit = async () => {
//     if (!title.trim()) {
//       Alert.alert('Error', 'Title is required');
//       return;
//     }

//     // ✅ payload always satisfies CreateTaskData / UpdateTaskData
//     const payload: TaskFormValues = {
//       title: title.trim(),
//       description: description.trim() || undefined,
//       status,
//       priority,
//       due_date: dueDate || undefined,
//     };

//     setLoading(true);
//     try {
//       if (isEditing && initialData?.id) {
//         // Use UPDATE for existing tasks
//         await updateTask(initialData.id, payload);
//       } else {
//         // Use CREATE for new tasks
//         await createTask(payload);
//       }

//       await onSubmit?.(payload);
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
//     { value: 'low', label: 'Low', color: '#10B981' },
//     { value: 'medium', label: 'Medium', color: '#F59E0B' },
//     { value: 'high', label: 'High', color: '#EF4444' },
//     { value: 'urgent', label: 'Urgent', color: '#DC2626' },
//   ];

//   const statusOptions: { value: TaskStatus; label: string; icon: string; color: string }[] = [
//     { value: 'pending', label: 'Pending', icon: 'clock', color: '#6B7280' },
//     { value: 'in_progress', label: 'In Progress', icon: 'play', color: '#3B82F6' },
//     { value: 'completed', label: 'Completed', icon: 'checkmark', color: '#10B981' },
//     { value: 'archived', label: 'Archived', icon: 'archivebox', color: '#8B5CF6' },
//   ];

//   return (
//     <ThemedView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <ThemedText type="subtitle" style={styles.title}>
//           {isEditing ? 'Edit Task' : 'Create New Task'}
//         </ThemedText>

//         <ThemedTextInput
//           placeholder="Task title*"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//           maxLength={255}
//         />

//         <ThemedTextInput
//           placeholder="Description (optional)"
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//           numberOfLines={4}
//           textAlignVertical="top"
//           maxLength={1000}
//         />

//         {/* Status Selection Section */}
//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Status
//           </ThemedText>
//           <View style={styles.optionsContainer}>
//             {statusOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.value}
//                 style={[
//                   styles.optionButton,
//                   status === option.value && styles.optionButtonSelected,
//                   { borderColor: option.color },
//                 ]}
//                 onPress={() => setStatus(option.value)}
//               >
//                 <ThemedText
//                   style={[
//                     styles.optionText,
//                     status === option.value && { color: option.color, fontWeight: '600' },
//                   ]}
//                 >
//                   {option.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Priority Selection Section */}
//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Priority
//           </ThemedText>
//           <View style={styles.optionsContainer}>
//             {priorityOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.value}
//                 style={[
//                   styles.optionButton,
//                   priority === option.value && styles.optionButtonSelected,
//                   { borderColor: option.color },
//                 ]}
//                 onPress={() => setPriority(option.value)}
//               >
//                 <ThemedText
//                   style={[
//                     styles.optionText,
//                     priority === option.value && { color: option.color, fontWeight: '600' },
//                   ]}
//                 >
//                   {option.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Due Date Selection */}
//         <View style={styles.section}>
//           <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//             Due Date
//           </ThemedText>
//           <TouchableOpacity 
//             style={[styles.input, styles.dateInput]} 
//             onPress={() => setShowDatePicker(true)}
//           >
//             <ThemedText style={{ color: dueDate ? '#111' : '#9CA3AF' }}>
//               {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date (optional)'}
//             </ThemedText>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={dueDate ? new Date(dueDate) : new Date()}
//               mode="date"
//               display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   setDueDate(selectedDate.toISOString());
//                 }
//               }}
//             />
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, styles.cancelButton]}
//             onPress={onCancel}
//             disabled={loading}
//           >
//             <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.button,
//               styles.submitButton,
//               (!title.trim() || loading) && styles.buttonDisabled,
//             ]}
//             onPress={handleSubmit}
//             disabled={!title.trim() || loading}
//           >
//             <ThemedText style={styles.submitButtonText}>
//               {loading
//                 ? isEditing
//                   ? 'Updating...'
//                   : 'Creating...'
//                 : isEditing
//                 ? 'Update Task'
//                 : 'Create Task'}
//             </ThemedText>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   scrollView: { flex: 1 },
//   title: { textAlign: 'center', marginBottom: 24 },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   textArea: { height: 100, paddingTop: 12 },
//   dateInput: {
//     justifyContent: 'center',
//   },
//   section: { marginBottom: 20 },
//   sectionTitle: { marginBottom: 12, fontSize: 16 },
//   optionsContainer: { 
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     gap: 8 
//   },
//   optionButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 2,
//     backgroundColor: 'white',
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   optionButtonSelected: { 
//     backgroundColor: '#F3F4F6' 
//   },
//   optionText: { 
//     fontSize: 14, 
//     textAlign: 'center'
//   },
//   buttonContainer: { 
//     flexDirection: 'row', 
//     gap: 12, 
//     marginTop: 8 
//   },
//   button: { 
//     flex: 1, 
//     height: 50, 
//     borderRadius: 12, 
//     justifyContent: 'center', 
//     alignItems: 'center' 
//   },
//   cancelButton: { 
//     backgroundColor: '#F3F4F6', 
//     borderWidth: 1, 
//     borderColor: '#E5E7EB' 
//   },
//   submitButton: { 
//     backgroundColor: '#007AFF' 
//   },
//   buttonDisabled: { 
//     opacity: 0.6 
//   },
//   cancelButtonText: { 
//     color: '#374151', 
//     fontWeight: '600' 
//   },
//   submitButtonText: { 
//     color: 'white', 
//     fontWeight: '600' 
//   },
// });

























// src/components/TaskForm.tsx

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useTasks } from '@/src/contexts/TaskContext';
import { TaskStatus, TaskPriority } from '@/src/types/task';
import DateTimePicker from '@react-native-community/datetimepicker';

// ✅ Define form values shape for external usage
export interface TaskFormValues {
  id?: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string;
}

interface TaskFormProps {
  onSubmit?: (data: TaskFormValues) => void | Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<TaskFormValues>;
  mode?: "create" | "update";   // ✅ new
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  mode,
}) => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialData?.status ?? 'pending');
  const [priority, setPriority] = useState<TaskPriority>(initialData?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(initialData?.due_date ?? '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createTask, updateTask } = useTasks();

  // ✅ If mode is passed, it takes priority; else fallback to id detection
  const isEditing = mode === "update" || Boolean(initialData?.id);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    const payload: TaskFormValues = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      due_date: dueDate || undefined,
    };

    setLoading(true);
    try {
      if (isEditing && initialData?.id) {
        await updateTask(initialData.id, payload);
      } else {
        await createTask(payload);
      }

      await onSubmit?.(payload);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: '#10B981' },
    { value: 'medium', label: 'Medium', color: '#F59E0B' },
    { value: 'high', label: 'High', color: '#EF4444' },
    { value: 'urgent', label: 'Urgent', color: '#DC2626' },
  ];

  const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
    { value: 'pending', label: 'Pending', color: '#6B7280' },
    { value: 'in_progress', label: 'In Progress', color: '#3B82F6' },
    { value: 'completed', label: 'Completed', color: '#10B981' },
    { value: 'archived', label: 'Archived', color: '#8B5CF6' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText type="subtitle" style={styles.title}>
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </ThemedText>

        <ThemedTextInput
          placeholder="Task title*"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          maxLength={255}
        />

        <ThemedTextInput
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={1000}
        />

        {/* Status Selection Section */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Status
          </ThemedText>
          <View style={styles.optionsContainer}>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  status === option.value && styles.optionButtonSelected,
                  { borderColor: option.color },
                ]}
                onPress={() => setStatus(option.value)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    status === option.value && { color: option.color, fontWeight: '600' },
                  ]}
                >
                  {option.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Priority Selection Section */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Priority
          </ThemedText>
          <View style={styles.optionsContainer}>
            {priorityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  priority === option.value && styles.optionButtonSelected,
                  { borderColor: option.color },
                ]}
                onPress={() => setPriority(option.value)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    priority === option.value && { color: option.color, fontWeight: '600' },
                  ]}
                >
                  {option.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Due Date Selection */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Due Date
          </ThemedText>
          <TouchableOpacity
            style={[styles.input, styles.dateInput]}
            onPress={() => setShowDatePicker(true)}
          >
            <ThemedText style={{ color: dueDate ? '#111' : '#9CA3AF' }}>
              {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date (optional)'}
            </ThemedText>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate ? new Date(dueDate) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDueDate(selectedDate.toISOString());
                }
              }}
            />
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            disabled={loading}
          >
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              (!title.trim() || loading) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!title.trim() || loading}
          >
            <ThemedText style={styles.submitButtonText}>
              {loading
                ? isEditing
                  ? 'Updating...'
                  : 'Creating...'
                : isEditing
                ? 'Update Task'
                : 'Create Task'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollView: { flex: 1 },
  title: { textAlign: 'center', marginBottom: 24 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textArea: { height: 100, paddingTop: 12 },
  dateInput: { justifyContent: 'center' },
  section: { marginBottom: 20 },
  sectionTitle: { marginBottom: 12, fontSize: 16 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'white',
    minWidth: 100,
    alignItems: 'center',
  },
  optionButtonSelected: { backgroundColor: '#F3F4F6' },
  optionText: { fontSize: 14, textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 8 },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  submitButton: { backgroundColor: '#007AFF' },
  buttonDisabled: { opacity: 0.6 },
  cancelButtonText: { color: '#374151', fontWeight: '600' },
  submitButtonText: { color: 'white', fontWeight: '600' },
});
