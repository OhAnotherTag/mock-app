import React, { createContext, useContext, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { AuthMachine } from '../state/AuthMachine';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [current, send, service] = useMachine(AuthMachine);
  return (
    <AuthContext.Provider value={service}>{children}</AuthContext.Provider>
  );
}

export const useAuthService = () => useContext(AuthContext);
