import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem("authToken");

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
