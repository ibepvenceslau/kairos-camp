'use client';

import { ToastContainer } from 'react-toastify';
import { createContext, ReactNode } from 'react';

import 'react-toastify/dist/ReactToastify.css';

type ToastContextData = {};

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastContext = createContext({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <ToastContext.Provider value={{}}>
      <ToastContainer theme="dark" />
      {children}
    </ToastContext.Provider>
  );
}
