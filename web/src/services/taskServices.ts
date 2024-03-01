import { Task } from "../types/task";
import { api } from "../utils/axios";

export const serviceTask = {
  get: async () => {
    try {
      const response = await api.get('/TodoItems');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  add: async (title: string) => {
    try {
      const response = await api.post('/TodoItems', {
        title,
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Error adding new task: ' + error.message);
    }
  },

  delete: async (taskId: number) => {
    try {
      await api.delete(`/TodoItems/${taskId}`);
    } catch (error: any) {
      throw new Error('Error when deleting task: ' + error.message);
    }
  },

  updateStatus: async (task: Task): Promise<Task> => {
    const newStatus = task.status === 'open' ? 'complete' : 'open';
    const url = `/TodoItems/${task.id}`;

    const data = {
      status: newStatus
    };

    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error('Error updating task status: ' + error.message);
    }
  },

};
