
// src/services/taskAPI.ts

import { API_BASE_URL } from '../config/api';
import { Task, CreateTaskData, UpdateTaskData } from '../types/task';

export interface TasksResponse {
  success: boolean;
  data: { tasks: Task[] };
}

export interface TaskResponse {
  success: boolean;
  data: { task: Task };
}

// Helper to build headers
const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

// Helper to handle responses safely
async function handleResponse<T>(response: Response, defaultError: string): Promise<T> {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || defaultError);
    } catch {
      const text = await response.text();
      throw new Error(text || defaultError);
    }
  }
  return response.json() as Promise<T>;
}

class TaskAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL; // e.g., http://localhost:3000/api
  }

  async getTasks(accessToken: string, filters?: { status?: string; priority?: string; search?: string }): Promise<Task[]> {
    let url = `${this.baseURL}/tasks`;

    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);
      if (params.toString()) url += `?${params.toString()}`;
    }

    const response = await fetch(url, { headers: authHeaders(accessToken) });
    const data = await handleResponse<TasksResponse>(response, 'Failed to fetch tasks');
    return data.data.tasks;
  }

  async getTask(accessToken: string, taskId: string): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks/${taskId}`, {
      headers: authHeaders(accessToken),
    });
    const data = await handleResponse<TaskResponse>(response, 'Failed to fetch task');
    return data.data.task;
  }

  async createTask(accessToken: string, taskData: CreateTaskData): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(taskData),
    });
    const data = await handleResponse<TaskResponse>(response, 'Failed to create task');
    return data.data.task;
  }

  async updateTask(accessToken: string, taskId: string, updates: UpdateTaskData): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: authHeaders(accessToken),
      body: JSON.stringify(updates),
    });
    const data = await handleResponse<TaskResponse>(response, 'Failed to update task');
    return data.data.task;
  }

  async deleteTask(accessToken: string, taskId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: authHeaders(accessToken),
    });
    await handleResponse(response, 'Failed to delete task');
  }

  async markTaskAsCompleted(accessToken: string, taskId: string): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: authHeaders(accessToken),
    });
    const data = await handleResponse<TaskResponse>(response, 'Failed to mark task as completed');
    return data.data.task;
  }

  async markTaskAsPending(accessToken: string, taskId: string): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks/${taskId}/pending`, {
      method: 'PATCH',
      headers: authHeaders(accessToken),
    });
    const data = await handleResponse<TaskResponse>(response, 'Failed to mark task as pending');
    return data.data.task;
  }

  async markTaskAsInProgress(accessToken: string, taskId: string): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks/${taskId}/in-progress`, {
      method: 'PATCH',
      headers: authHeaders(accessToken),
    });
    const data = await handleResponse<TaskResponse>(response, 'Failed to mark task as in progress');
    return data.data.task;
  }

  async archiveTask(accessToken: string, taskId: string): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks/${taskId}/archive`, {
      method: 'PATCH',
      headers: authHeaders(accessToken),
    });
    const data = await handleResponse<TaskResponse>(response, 'Failed to archive task');
    return data.data.task;
  }
}

export const taskAPI = new TaskAPI();
