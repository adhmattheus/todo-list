import { ActionsDiv, BoxContainer, ButtonDiv, CompleteButton, DataContainer, DeleteButton, EditButton, HeaderContainer, TasksDiv, TitleDiv } from "../styles/BoxContainer";
import { CheckCircleFilled, DeleteFilled, EditFilled, FireFilled } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModalEditTask } from "./Modal";
import { api } from "../utils/axios";
import { Task } from "../types/task";
import { Button, Form, FormInstance, Input, Space, Tooltip } from "antd";
import { Store } from "antd/es/form/interface";


export function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitleToEdit, setTaskTitleToEdit] = useState("");
    const [taskIdToEdit, setTaskIdToEdit] = useState<number>(-1);
    const [form] = Form.useForm<FormInstance<any>>();
    const formRef = useRef<FormInstance<any>>(null);


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

    const handleAddTask = async (values: Store) => {
        const taskTitle = values.taskTitle;

        if (!taskTitle || taskTitle.trim() === "") {
            alert("Please enter a title for the task.");
            return;
        }

        try {

            const response = await api.post('/TodoItems', {
                title: taskTitle
            });
            const newTask = response.data;
            setTasks(prevTasks => [...prevTasks, newTask]);

            if (formRef.current) {
                formRef.current.resetFields();
            }

        } catch (error) {
            console.error('Error adding new tasks:', error);
        }
    };

    const handleChangeStatusTask = async (taskId: number, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'open' ? 'complete' : 'open';
            const url = `/TodoItems/${taskId}`;

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
            <Form form={form} onFinish={handleAddTask} ref={formRef}>
                <Space>
                    <Form.Item name="taskTitle">
                        <Input autoComplete="off" placeholder="Insert a task" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Task
                        </Button>
                    </Form.Item>
                </Space>
            </Form>

            {
                tasks.length > 0 ? (
                    <>
                        <BoxContainer>
                            <HeaderContainer>
                                <TasksDiv>Tasks</TasksDiv>
                                <ActionsDiv>Actions</ActionsDiv>
                            </HeaderContainer>

                            

                            {tasks.map(task => (
                                <DataContainer key={task.id}>
                                    <TitleDiv style={{ textDecoration: task.status === 'complete' ? 'line-through' : 'none' }}>{task.title}</TitleDiv>
                                    <ButtonDiv>
                                        <Tooltip title={task.status === 'open' ? 'task complete?' : 'remake?'}>
                                            <CompleteButton status={task.status} onClick={() => handleChangeStatusTask(task.id, task.status)}>
                                                {task.status === 'open' ? <CheckCircleFilled /> : <FireFilled />}
                                            </CompleteButton>
                                        </Tooltip>

                                        <Tooltip title="edit task?">
                                            <EditButton onClick={() => handleEditTask(task.id, task.title, task.status)}>
                                                <EditFilled />
                                            </EditButton>
                                        </Tooltip>

                                        <Tooltip title="delete task?">
                                            <DeleteButton onClick={() => handleDeleteTask(task.id)}>
                                                <DeleteFilled />
                                            </DeleteButton>
                                        </Tooltip>
                                    </ButtonDiv>
                                </DataContainer>
                            ))}

                        </BoxContainer>
                        {isModalOpen && (
                            <ModalEditTask
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                onSave={(newTitle: string) => handleUpdateTask(taskIdToEdit, newTitle)}
                                currentTitle={taskTitleToEdit}
                            />

                        )}

                    </>
                ) : (
                    <p>No tasks</p>
                )
            }

        </>
    )
}
