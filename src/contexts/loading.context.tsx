'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { LoadingOverlay } from '@/components/loading-overlay';

type LoadingContextData = {
  openLoading: () => void;
  closeLoading: () => void;
};

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingContext = createContext({} as LoadingContextData);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [show, setShow] = useState(false);

  const openLoading = useCallback(() => {
    setShow(true);
  }, []);

  const closeLoading = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        openLoading,
        closeLoading,
      }}
    >
      {show && <LoadingOverlay />}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);

  return context;
};
