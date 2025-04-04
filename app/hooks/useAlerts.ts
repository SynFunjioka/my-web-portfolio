import { useState } from "react";
import { AlertProps } from "~/components/ui/alerts/Alert";
import { AlertType } from "~/types/ui/alert.types";

export interface UseAlerts {
  alerts     : AlertProps[];
  addAlert   : (message: string, type?: AlertType, duration?: number | null) => void;
  removeAlert: (id: string) => void;
}

export const useAlerts = (): UseAlerts => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const addAlert = (message: string, type: AlertType = "primary", duration: number | null = null) => {
    const id = Math.random().toString(36).substring(2, 9);
    setAlerts((prev) => [...prev, { id, message, type, duration, onClose: removeAlert }]);

    // if(duration){
    //   setTimeout(() => removeAlert(id), duration);
    // }
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return { alerts, addAlert, removeAlert };
};
