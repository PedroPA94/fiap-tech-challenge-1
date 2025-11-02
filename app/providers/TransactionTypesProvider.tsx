"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";

const TransactionTypesContext = createContext<string[]>([]);

export function TransactionTypesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch(`${BASE_URL}/api/transactions/types`);
      const data = await res.json();
      setTypes(data);
    };
    fetchTypes();
  }, []);

  return (
    <TransactionTypesContext.Provider value={types}>
      {children}
    </TransactionTypesContext.Provider>
  );
}

export function useTransactionTypes() {
  return useContext(TransactionTypesContext);
}
