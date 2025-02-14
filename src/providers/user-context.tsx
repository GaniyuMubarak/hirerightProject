import Cookies from "js-cookie";
import React, { createContext, useContext, useReducer } from "react";

export const UserContext = createContext<{
  state: {
    userInfo: any | null;
  };
  dispatch: React.Dispatch<any>;
}>({
  state: { userInfo: null },
  dispatch: () => null,
});

const initialState = {
  userInfo: Cookies.get("HRuserInfo")
    ? JSON.parse(Cookies.get("HRuserInfo") || "{}")
    : null,
};

function reducer(
  state: { userInfo: any | null },
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };

    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
      };

    default:
      return state;
  }
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
