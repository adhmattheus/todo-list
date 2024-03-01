import { Task } from "./task";

export interface NewModalProps {
    open: boolean;
    onClose: () => void;
    onOk: (newTitle: string) => Promise<void>; // Definir a função onOk para aceitar um argumento de tipo string
    taskToEdit: Task | null;
  }