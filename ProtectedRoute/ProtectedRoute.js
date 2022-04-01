import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
    return localStorage.getItem('AccessToken') ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;
