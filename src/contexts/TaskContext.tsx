
// // src/contexts/TaskContext.tsx

// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Task, TasksFilter, CreateTaskData, UpdateTaskData } from '../types/task';
// import { taskAPI } from '../services/taskAPI';
// import { useAuth } from './AuthContext';

// interface TaskContextType {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   fetchTasks: (filters?: TasksFilter) => Promise<void>;
//   createTask: (taskData: CreateTaskData) => Promise<Task>;
//   updateTask: (taskId: string, updates: UpdateTaskData) => Promise<Task>;
//   deleteTask: (taskId: string) => Promise<void>;
//   markAsCompleted: (taskId: string) => Promise<Task>;
//   markAsPending: (taskId: string) => Promise<Task>;
//   markAsInProgress: (taskId: string) => Promise<Task>;
//   archiveTask: (taskId: string) => Promise<Task>;
//   clearError: () => void;
// }

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// export const useTasks = () => {
//   const context = useContext(TaskContext);
//   if (!context) {
//     throw new Error('useTasks must be used within a TaskProvider');
//   }
//   return context;
// };

// interface TaskProviderProps {
//   children: ReactNode;
// }

// export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { accessToken } = useAuth();

//   // ✅ always replace tasks with the latest server state
//   const fetchTasks = async (filters?: TasksFilter) => {
//     if (!accessToken) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const tasksData = await taskAPI.getTasks(accessToken, filters);
//       setTasks(tasksData); // ⬅️ replace instead of merging
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (taskData: CreateTaskData): Promise<Task> => {
//     if (!accessToken) throw new Error('No access token');
//     setLoading(true);
//     setError(null);
//     try {
//       const newTask = await taskAPI.createTask(accessToken, taskData);
//       setTasks(prev => [newTask, ...prev]); // prepend new task
//       return newTask;
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateTask = async (taskId: string, updates: UpdateTaskData): Promise<Task> => {
//     if (!accessToken) throw new Error('No access token');
//     setLoading(true);
//     setError(null);
//     try {
//       const updatedTask = await taskAPI.updateTask(accessToken, taskId, updates);
//       // ✅ replace task inline so UI updates immediately
//       setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
//       return updatedTask;
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteTask = async (taskId: string): Promise<void> => {
//     if (!accessToken) throw new Error('No access token');
//     setLoading(true);
//     setError(null);
//     try {
//       await taskAPI.deleteTask(accessToken, taskId);
//       setTasks(prev => prev.filter(task => task.id !== taskId));
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsCompleted = async (taskId: string): Promise<Task> => {
//     if (!accessToken) throw new Error('No access token');
//     const updatedTask = await taskAPI.markTaskAsCompleted(accessToken, taskId);
//     setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
//     return updatedTask;
//   };

//   const markAsPending = async (taskId: string): Promise<Task> => {
//     if (!accessToken) throw new Error('No access token');
//     const updatedTask = await taskAPI.markTaskAsPending(accessToken, taskId);
//     setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
//     return updatedTask;
//   };

//   const markAsInProgress = async (taskId: string): Promise<Task> => {
//     if (!accessToken) throw new Error('No access token');
//     const updatedTask = await taskAPI.markTaskAsInProgress(accessToken, taskId);
//     setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
//     return updatedTask;
//   };

//   const archiveTask = async (taskId: string): Promise<Task> => {
//     if (!accessToken) throw new Error('No access token');
//     const updatedTask = await taskAPI.archiveTask(accessToken, taskId);
//     setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
//     return updatedTask;
//   };

//   const clearError = () => setError(null);

//   const value: TaskContextType = {
//     tasks,
//     loading,
//     error,
//     fetchTasks,
//     createTask,
//     updateTask,
//     deleteTask,
//     markAsCompleted,
//     markAsPending,
//     markAsInProgress,
//     archiveTask,
//     clearError,
//   };

//   return (
//     <TaskContext.Provider value={value}>
//       {children}
//     </TaskContext.Provider>
//   );
// };




















// src/contexts/TaskContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, TasksFilter, CreateTaskData, UpdateTaskData } from '../types/task';
import { taskAPI } from '../services/taskAPI';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (filters?: TasksFilter) => Promise<void>;
  createTask: (taskData: CreateTaskData) => Promise<Task>;
  updateTask: (taskId: string, updates: UpdateTaskData) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
  markAsCompleted: (taskId: string) => Promise<Task>;
  markAsPending: (taskId: string) => Promise<Task>;
  markAsInProgress: (taskId: string) => Promise<Task>;
  archiveTask: (taskId: string) => Promise<Task>;
  clearError: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  // ✅ Always fetch fresh list
  const fetchTasks = async (filters?: TasksFilter) => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      const tasksData = await taskAPI.getTasks(accessToken, filters);
      setTasks(tasksData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskData): Promise<Task> => {
    if (!accessToken) throw new Error('No access token');
    setLoading(true);
    setError(null);
    try {
      const newTask = await taskAPI.createTask(accessToken, taskData);
      setTasks(prev => [newTask, ...prev]); // ✅ prepend correctly
      return newTask;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId: string, updates: UpdateTaskData): Promise<Task> => {
    if (!accessToken) throw new Error('No access token');
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await taskAPI.updateTask(accessToken, taskId, updates);
      setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task))); // ✅ inline replace
      return updatedTask;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    if (!accessToken) throw new Error('No access token');
    setLoading(true);
    setError(null);
    try {
      await taskAPI.deleteTask(accessToken, taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (taskId: string): Promise<Task> => {
    if (!accessToken) throw new Error('No access token');
    const updatedTask = await taskAPI.markTaskAsCompleted(accessToken, taskId);
    setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task)));
    return updatedTask;
  };

  const markAsPending = async (taskId: string): Promise<Task> => {
    if (!accessToken) throw new Error('No access token');
    const updatedTask = await taskAPI.markTaskAsPending(accessToken, taskId);
    setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task)));
    return updatedTask;
  };

  const markAsInProgress = async (taskId: string): Promise<Task> => {
    if (!accessToken) throw new Error('No access token');
    const updatedTask = await taskAPI.markTaskAsInProgress(accessToken, taskId);
    setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task)));
    return updatedTask;
  };

  const archiveTask = async (taskId: string): Promise<Task> => {
    if (!accessToken) throw new Error('No access token');
    const updatedTask = await taskAPI.archiveTask(accessToken, taskId);
    setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task)));
    return updatedTask;
  };

  const clearError = () => setError(null);

  const value: TaskContextType = {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    markAsCompleted,
    markAsPending,
    markAsInProgress,
    archiveTask,
    clearError,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

