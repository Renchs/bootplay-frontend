import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoutes() {
    const data = JSON.parse(localStorage.getItem('@Auth.Data') || "{}");
    return data.id ? <Outlet /> : <Navigate to='/login' />;
}
