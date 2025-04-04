import { useEffect, useRef } from "react";
import { AlertType } from "~/types/ui/alert.types";
import { cn } from "~/utils/tailwind.util";
import Icon from "../Icon";

export interface AlertProps {
  id          : string;
  message     : string;
  type       ?: AlertType;
  duration   ?: null | number;                // en milisegundos
  onClose     : (id: string) => void;
}

const alertStyles: Record<AlertType, string> = {
  primary  : "border bg-blue-200 border-blue-500 text-blue-800",
  secondary: "border bg-gray-200 border-gray-500 text-gray-800",
  success  : "border bg-green-200 border-green-500 text-green-800",
  danger   : "border bg-red-200 border-red-500 text-red-800",
  warning  : "border bg-yellow-200 border-yellow-500 text-yellow-800",
  info     : "border bg-cyan-200 border-cyan-500 text-cyan-800",
};

const alertIcon: Record<AlertType, string> = {
  primary  : "alert-circle",
  secondary: "chevron-right",
  success  : "check-circle",
  danger   : "x-circle",
  warning  : "alert-circle",
  info     : "help-circle",
};

export const Alert = ({
  id,
  message,
  type = "primary",
  duration,
  onClose,
}: AlertProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (duration) {
      timerRef.current = setTimeout(() => onClose(id), duration);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative p-4 rounded-md shadow-lg flex items-center justify-between",
        alertStyles[type]
      )}
    >
      <span className="inline-flex gap-2 items-center">
        <Icon iconName={alertIcon[type]} />
        {message}
      </span>
      <button onClick={() => onClose(id)} className="ml-4 text-white font-bold">
        ✖
      </button>
    </div>
  );
};
