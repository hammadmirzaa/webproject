import { Navigate, Route } from "react-router-dom";
import { UseAuthContext } from "./authContext";

const ProtectedRoute = ({ element, ...rest }) => {
    console.log(element)
  const { isAuthenticated } = UseAuthContext();
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
