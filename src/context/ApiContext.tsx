import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';
import type { MailApi, PasswordApi } from '../types/api';

type ApiContextType = {
  mailApi: MailApi;
  setMailApi: Dispatch<SetStateAction<MailApi>>;
  passwordApi: PasswordApi;
  setPasswordApi: Dispatch<SetStateAction<PasswordApi>>;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [mailApi, setMailApi] = useState<MailApi>(null);
  const [passwordApi, setPasswordApi] = useState<PasswordApi>(null);

  return (
    <ApiContext.Provider value={{ mailApi, setMailApi, passwordApi, setPasswordApi }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApiContext must be used within an ApiProvider');
  return context;
};