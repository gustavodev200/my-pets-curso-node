import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

const UserProvider = ({ children }) => {
  const { register } = useAuth();

  return <Context.Provider value={{register}}>{children}</Context.Provider>;
};

export {Context, UserProvider}
