import React, { createContext, useContext, useReducer } from "react";
import { readSessionFromCookie } from "@/lib/auth";
import type { AuthResponse } from "@/lib/types/auth";

interface UserContextType {
  state: { userInfo: AuthResponse | null };
  dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

export const UserContext = createContext<UserContextType>({
  state: { userInfo: null },
  dispatch: () => null,
});

const initialState = {
  userInfo: readSessionFromCookie(),
};

function reducer(
  state: { userInfo: AuthResponse | null },
  action: { type: string; payload?: any },
) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};