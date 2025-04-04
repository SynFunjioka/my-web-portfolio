import { AlertType } from "~/types/alert.types";
import { Alert, AlertProps } from "./Alert";

interface AlertGroupProps {
  alerts: AlertProps[];
  removeAlert: (id: string) => void;
}

export const AlertGroup = ({ alerts, removeAlert }: AlertGroupProps) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
          onClose={removeAlert}
        />
      ))}
    </div>
  );
};
