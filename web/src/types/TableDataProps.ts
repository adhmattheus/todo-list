import { Task } from "./task";

export interface TableDataProps {
    tasks: Task[];
    handleEditTask: (task: Task) => void;
    handleDeleteTask: (id: number) => void;
    handleChangeStatusTask: (task: Task) => void;
}   