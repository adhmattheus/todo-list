import { Task } from "./task";

export interface TableDataProps {
    tasks: Task[];
    handleEditTask: (id: number, title: string, status: string) => void;
    handleDeleteTask: (id: number) => void;
    handleChangeStatusTask: (id: number, status: string) => void;
}   