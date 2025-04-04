import { useRef, useState } from "react";
import { ConfirmModal } from "~/components/shared/Modals/ConfirmModal";

interface ConfirmModalContent {
  title  ?: string;
  message : string;
}

export const useConfirmModal = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [modalContent, setModalContent] = useState<ConfirmModalContent>({
    title: "",
    message: "",
  });
  const resolvePromise = useRef<(value: boolean) => void>();

  const confirm = ({ title, message }: ConfirmModalContent) => {
    setModalContent({ title, message });
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      resolvePromise.current = resolve;
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolvePromise.current) {
      resolvePromise.current(true);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolvePromise.current) {
      resolvePromise.current(false);
    }
  };

  return {
    ConfirmDialog: (
      <ConfirmModal
        isOpen={isOpen}
        title={modalContent.title}
        message={modalContent.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ),
    confirm,
  };
};
