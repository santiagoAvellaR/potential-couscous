import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';

type ApiContextType = {
  mail: string;
  setMail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <ApiContext.Provider value={{ mail, setMail, password, setPassword }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApiContext must be used within an ApiProvider');
  return context;
};