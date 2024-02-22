export interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newTitle: string) => void;
    currentTitle: string;
}