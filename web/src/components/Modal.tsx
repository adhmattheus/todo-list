import { ModalWrapper, InputField, Button, CancelButton, OptionButton } from "../styles/Modal";
import { EditTaskModalProps } from "../types/modal";
import { useState } from "react";

export function ModalEditTask({ isOpen, onClose, onSave, currentTitle }: EditTaskModalProps) {
    const [editedTitle, setEditedTitle] = useState(currentTitle);

    const handleSave = () => {
        onSave(editedTitle);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <>
            {isOpen && (
                <ModalWrapper>
                    <InputField
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <OptionButton>
                        <Button onClick={handleSave}>Salvar</Button>
                        <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
                    </OptionButton>
                </ModalWrapper>
            )}
        </>
    );
}
