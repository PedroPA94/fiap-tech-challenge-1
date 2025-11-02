"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <div
          className="position-absolute top-0 bottom-0 start-0 end-0"
          style={{ backgroundColor: "#00000050" }}
        >
          <div className="d-flex w-100 h-100 justify-content-center align-items-center z-50 ">
            <div className="spinner-border text-highlight" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("Erro ao obter context no LoadingProvider");
  }
  return context;
};
