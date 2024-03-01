import { useCallback, useEffect, useState } from "react";
import { serviceTask } from "../services/taskServices";
import { Button, Form, Input, message } from "antd";
import { DivForm } from "../styles/FormContainer";
import { Store } from "antd/es/form/interface";
import { TableData } from "./TableData";
import { api } from "../utils/axios";
import { Task } from "../types/task";
import { NewModal } from "./NewModal";


export function TodoList() {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form] = Form.useForm();

  const handleGetTask = useCallback(async () => {
    setTasks(await serviceTask.get());
  }, []);

  useEffect(() => {
    handleGetTask();
  }, [handleGetTask]);

  const handleAddTask = useCallback(async (values: Store) => {
    const title = values.title;
    const newTask = await serviceTask.add(title);
    setTasks(prevTasks => [...prevTasks, newTask]);
    message.success('Task added!');
    form.resetFields();
  }, [form, setTasks]);

  const handleDeleteTask = async (taskId: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      await serviceTask.delete(taskId);
      setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== taskId)
      );
      message.success('Deleted task');
    }
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

  const handleChangeStatusTask = async (task: Task) => {
    const updatedTask = await serviceTask.updateStatus(task);
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
    handleGetTask();
  };

  const handleEditTask = (task: Task) => {
    if (task.status === 'complete') {
      message.error('Cannot edit a completed task.');
      return;
    }
    setTaskToEdit(task); // Definir a tarefa que será editada
    setIsModalOpen(true); // Abrir a modal de edição
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NewModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onOk={(newTitle: string) => handleUpdateTask(taskToEdit!.id, newTitle)}  // passa o ID da tarefa para a função de atualização
        taskToEdit={taskToEdit} // passa a tarefa que está sendo editada
      />

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
    </>
  )
}