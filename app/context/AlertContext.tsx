import { createContext, useContext, useState, ReactNode } from "react";
import { AlertGroup } from "~/components/shared/alerts/AlertGroup";
import { UseAlerts, useAlerts } from "~/hooks/useAlerts";
import { AlertType } from "~/types/alert.types";

const AlertContext = createContext<UseAlerts | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const useAlert = useAlerts();

  return (
    <AlertContext.Provider value={useAlert}>
      {children}
      <AlertGroup alerts={useAlert.alerts} removeAlert={useAlert.removeAlert} />
    </AlertContext.Provider>
  );
};

export const useGlobalAlert = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
};
