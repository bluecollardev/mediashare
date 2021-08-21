import React, { createContext } from 'react';
import { ApiService } from './apis';
export type ApiContextType = {
  api: ApiService;
  setApi: (api: ApiService) => void;
};
export const ApiContext: React.Context<ApiContextType> = createContext({
  api: null,
  setApi: (user: ApiService) => console.warn('no user provider', user),
});
