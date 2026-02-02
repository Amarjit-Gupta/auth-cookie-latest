import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";


const PrivateRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // console.log("private: ",isAuthenticated,loading);

    // if (loading) return <p>Checking authentication...</p>;
    if (loading) {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <p>Checking authentication...</p>
    </div>
  );
}

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
