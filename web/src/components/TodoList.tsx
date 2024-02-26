import { useCallback, useEffect, useState } from "react";
import { TableData } from "./TableData";
import { ModalEditTask } from "./Modal";
import { api } from "../utils/axios";
import { Task } from "../types/task";
import { Button, Form, Input, message } from "antd";
import { Store } from "antd/es/form/interface";
import { ButtonSubmit, DivForm } from "../styles/FormContainer";



export function TodoList() {
    const [taskIdToEdit, setTaskIdToEdit] = useState<number>(-1);
    const [taskTitleToEdit, setTaskTitleToEdit] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [form] = Form.useForm();

    const handleEditTask = (taskId: number, taskTitle: string, taskStatus: string) => {

        if (taskStatus === 'complete') {
            message.error('Cannot edit a completed task..');
            return;
        }
        setTaskIdToEdit(taskId);
        setTaskTitleToEdit(taskTitle);
        setIsModalOpen(true);
    };

    const handleUpdateTask = async (taskId: number, newTitle: string) => {

        if (!newTitle || newTitle.trim() === "") {
            message.error('Please, enter a title for the task.');
            return;
        }

        try {
            const url = `/TodoItems/${taskId}`;
            const data = {
                title: newTitle
            };

            const response = await api.put(url, data);
            const updatedTask = response.data;

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
            setIsModalOpen(false);
            message.success('updated task')
            handleGetTask();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleAddTask = async (values: Store) => {
        const taskTitle = values.taskTitle;

        try {
            const response = await api.post('/TodoItems', {
                title: taskTitle
            });
            const newTask = response.data;
            setTasks(prevTasks => [...prevTasks, newTask]);
            message.success('task added!');

            form.resetFields();

        } catch (error) {
            console.error('Error adding new tasks:', error);
        }
    };


    const handleChangeStatusTask = async (taskId: number, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'open' ? 'complete' : 'open';
            const url = `/TodoItems/${taskId}`;
            console.log(taskId)

            const data = {
                status: newStatus
            };

            const response = await api.put(url, data);
            const updatedTask = response.data;

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
            handleGetTask();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this task?");
        if (isConfirmed) {
            try {
                await api.delete(`/TodoItems/${taskId}`);
                setTasks(prevTasks =>
                    prevTasks.filter(task => task.id !== taskId)
                );
                message.success('deleted task')
            } catch (error) {
                console.error('Error when deleting task:', error);
            }
        }
    };

    const handleGetTask = useCallback(async () => {
        try {
            const response = await api.get('/TodoItems');
            setTasks(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        handleGetTask();
    }, [handleGetTask]);


    return (
        <>

            <DivForm form={form} onFinish={() => handleAddTask}>

                <Form.Item
                    name="taskTitle"
                    rules={[{ required: true, message: 'Please enter a title for the task.' }]}
                >
                    <Input type="text" autoComplete="off" maxLength={50} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add task</Button>
                </Form.Item>

            </DivForm>



            {tasks.length > 0 ? (
                <TableData
                    tasks={tasks}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                    handleChangeStatusTask={handleChangeStatusTask}
                />
            ) : (<p>No tasks</p>)}

            {isModalOpen && (
                <ModalEditTask
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={(newTitle: string) => handleUpdateTask(taskIdToEdit, newTitle)}
                    currentTitle={taskTitleToEdit}
                />

            )}
        </>
    )
}
