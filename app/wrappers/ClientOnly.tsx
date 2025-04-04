import { useIsomorphicLayoutEffect } from "motion/react";
import React, { useState, useEffect, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

/**
 * Este componente no renderiza nada hasta que se monte en el cliente.
 */
export const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <>{children}</>;
};
