import { Task } from "../types/task";
import { api } from "../utils/axios";

export const getTask = async () => {
    try {
        const response = await api.get('/TodoItems');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const addTask = async (title: string) => {
    try {
        const response = await api.post('/TodoItems', {
            title,
        });
        return response.data;
    } catch (error: any) {
        throw new Error('Error adding new task: ' + error.message);
    }
};

export const deleteTask = async (taskId: number) => {
    try {
        await api.delete(`/TodoItems/${taskId}`);
    } catch (error: any) {
        throw new Error('Error when deleting task: ' + error.message);
    }

};

export const updateTaskStatus = async (task: Task): Promise<Task> => {
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
};
