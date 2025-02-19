import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsePostFormContext } from "./postContext";

const AuthContext = createContext();
export const UseAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const {isLogout,setIsLogout} = UsePostFormContext()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate();
  const register = async () => {
    try {
      const response = await fetch(
        "http://localhost/web_project/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        navigate("/login");
      }
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const login = async () => {
    try {
      const response = await fetch("http://localhost/web_project/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "success") {
        setIsAuthenticated(true); 
        setIsLogout(true)  
        navigate("/listItems");
      }
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <AuthContext.Provider value={{ formData, setFormData, register, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
