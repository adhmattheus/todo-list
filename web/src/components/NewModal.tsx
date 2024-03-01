import { NewModalProps } from "../types/newModal";
import { useEffect, useState } from "react";
import { Input, Modal } from "antd";

export function NewModal({ onOk, open, onClose, taskToEdit }: NewModalProps) {
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setEditedTitle(taskToEdit.title || '');
    }
  }, [taskToEdit]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };
  const handleOk = async () => {
    onClose();
    await onOk(editedTitle); // Chama a função onOk passada como propriedade com o novo título
  };

  const handleCancel = () => {
    onClose();
  };

  // Se não há tarefa para editar, retorna nulo
  if (!taskToEdit) {
    return null;
  }

  return (
    <Modal
      title="Edit Task"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input value={editedTitle} onChange={handleTitleChange} />
    </Modal>
  );
};