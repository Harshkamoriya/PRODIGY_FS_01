import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  const [resetURL, setResetURL] = useState(""); // Ensure it's set dynamically if needed.

  useEffect(() => {
    if (auth) {
      sessionStorage.setItem("auth", JSON.stringify(auth));
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, resetURL, setResetURL }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }; // Export AuthProvider properly
export default AuthContext;
