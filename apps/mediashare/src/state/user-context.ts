import React, { createContext } from 'react';
import { LoginResponseDto } from '../api/models/login-response-dto';
export type UserContextType = {
  user: LoginResponseDto;
  setUser: (user: LoginResponseDto) => void;
};
export const UserContext: React.Context<UserContextType> = React.createContext({
  user: null,
  setUser: (user: LoginResponseDto) => console.warn('no user provider', user),
});
