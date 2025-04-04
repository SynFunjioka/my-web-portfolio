import Button from "../Button";
import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen    : boolean;
  title    ?: string;
  message   : string;
  onConfirm : () => void;
  onCancel  : () => void;
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2 className="text-xl font-bold">{title || "Confirm"}</h2>
      <p>{message}</p>
      <div className="flex justify-end mt-5">
        <Button onClick={onCancel} variant="tertiary" className="mr-2">
          Cancelar
        </Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </div>
    </Modal>
  );
}

