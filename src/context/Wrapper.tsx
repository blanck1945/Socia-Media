import { useState, useEffect } from "react";
import AuthContext from "./auth";

export interface LogUser {
  authenticateUser?: boolean;
  userName?: string;
  msg?: string;
  loading: boolean;
}

const ContextWrapper = ({ children }) => {
  const [logUser, setLogUser] = useState<LogUser>({
    authenticateUser: false,
    userName: "",
    msg: "",
    loading: false,
  });

  return (
    <AuthContext.Provider value={{ logUser, setLogUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextWrapper;
