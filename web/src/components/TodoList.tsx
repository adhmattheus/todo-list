import { useCallback, useEffect, useState } from "react";
import { TableData } from "./TableData";
import { ModalEditTask } from "./Modal";
import { api } from "../utils/axios";
import { Task } from "../types/task";
import { Button, Form, Input, message } from "antd";
import { Store } from "antd/es/form/interface";
import { DivForm } from "../styles/FormContainer";
import { addTask, deleteTask, getTask, updateTaskStatus } from "../services/taskServices";



export function TodoList() {
    const [taskIdToEdit, setTaskIdToEdit] = useState<number>(-1);
    const [taskTitleToEdit, setTaskTitleToEdit] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [form] = Form.useForm();

    const handleGetTask = useCallback(async () => {
        setTasks(await getTask());
    }, []);

    useEffect(() => {
        handleGetTask();
    }, [handleGetTask]);

    const handleAddTask = async (values: Store) => {
        const title = values.title;
        const newTask = await addTask(title);
        setTasks(prevTasks => [...prevTasks, newTask]);
        message.success('Task added!');
        form.resetFields();
    };

    const handleDeleteTask = async (taskId: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this task?");
        if (isConfirmed) {
            await deleteTask(taskId);
            setTasks(prevTasks =>
                prevTasks.filter(task => task.id !== taskId)
            );
            message.success('Deleted task');
        }
    };


    const handleEditTask = (task: Task) => {
        if (task.status === 'complete') {
            message.error('Cannot edit a completed task..');
            return;
        }
        setTaskIdToEdit(task.id);
        setTaskTitleToEdit(task.title);
        setIsModalOpen(true);
    };


    const handleUpdateTask = async (taskId: number, title: string) => {

        if (!title || title.trim() === "") {
            message.error('Please, enter a title for the task.');
            return;
        }

        try {
            const url = `/TodoItems/${taskId}`;
            const data = {
                title,
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

    const handleChangeStatusTask = async (task: Task) => {
        const updatedTask = await updateTaskStatus(task);
        setTasks(prevTasks =>
            prevTasks.map(t =>
                t.id === updatedTask.id ? updatedTask : t
            )
        );
        handleGetTask();
    };



    return (
        <>

            <Form form={form} onFinish={handleAddTask}>
                <DivForm>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please enter a title for the task.' }]}
                    >
                        <Input type="text" autoComplete="off" maxLength={50} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add task</Button>
                    </Form.Item>
                </DivForm>
            </Form>



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


