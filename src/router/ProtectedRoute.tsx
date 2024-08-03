// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import useAuthStore from '../store/useAuthStore';
import { tokenVerify } from '../util/tokenVerify';

interface ProtectedRouteProps {
    element: React.ReactElement;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
    const { isAuthenticated, role } = useAuthStore();

    const cookie = new Cookies();
    const token = cookie.get('accessToken');

    const isValidToken = tokenVerify(token);

    if (!isValidToken || !isAuthenticated || (role && !allowedRoles.includes(role))) {
        return <Navigate to='/login' replace />;
    }

    return element;
};

export default ProtectedRoute;
