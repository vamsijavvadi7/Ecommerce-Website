import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthProvider";
const ProtectedRoute = ({ children }) => {
    const { presentUser } = useContext(AuthContext);

    if (!presentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
