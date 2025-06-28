import { createContext } from 'react';
import { ContextType } from '../types/commonTypes';

export const AppContext = createContext<{ context: ContextType; setContext: React.Dispatch<React.SetStateAction<ContextType>> }>({
  context: {},
  setContext: () => {},
});