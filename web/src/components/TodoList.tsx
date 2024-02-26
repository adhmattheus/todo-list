import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ButtonSubmit, ContainerForm } from "../styles/FormContainer";
import { TableData } from "./TableData";
import { ModalEditTask } from "./Modal";
import { api } from "../utils/axios";
import { Task } from "../types/task";
import { message } from "antd";

export function TodoList() {
    const formRef = useRef<HTMLFormElement>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitleToEdit, setTaskTitleToEdit] = useState("");
    const [taskIdToEdit, setTaskIdToEdit] = useState<number>(-1);


    const handleEditTask = (taskId: number, taskTitle: string, taskStatus: string) => {

        if (taskStatus === 'complete') {

            alert('Cannot edit a completed task.');
            return;
        }
        setTaskIdToEdit(taskId);
        setTaskTitleToEdit(taskTitle);
        setIsModalOpen(true);
    };

    const handleUpdateTask = async (taskId: number, newTitle: string) => {

        if (!newTitle || newTitle.trim() === "") {
            alert("Please enter a title for the task.");
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
            handleGetTask();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const taskTitle = formData.get("taskTitle") as string;

        if (!taskTitle || taskTitle.trim() === "") {
            message.error('Please enter a title for the task.');
            return;
        }

        try {

            const response = await api.post('/TodoItems', {
                title: taskTitle
            });
            const newTask = response.data;
            setTasks(prevTasks => [...prevTasks, newTask]);
            message.success('task added!');

            if (formRef.current) {
                formRef.current.reset();
            }

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
            console.log(response.data)

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
            <ContainerForm ref={formRef} onSubmit={handleAddTask} >
                <input
                    name="taskTitle"
                    type="text"
                    autoComplete="off"
                    maxLength={50}
                />
                <ButtonSubmit type="submit">
                    Add task
                </ButtonSubmit>
            </ContainerForm>

            <TableData
                tasks={tasks}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
                handleChangeStatusTask={handleChangeStatusTask}
            />

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
