import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const [updating,setIsUpdating]=useState(
    JSON.parse(localStorage.getItem("updating")) || false

  )

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("updating",updating)
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle ,updating }}>
      {children}
    </DarkModeContext.Provider>
  );
};
