import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Spinner from '../components/Spinner';



const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Spinner></Spinner>
    }

    if (user) {
        return children
    }

    return <Navigate to={"/login"}></Navigate>
};

export default PrivateRouter;