import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';

const UserProtectedRoute = () =>
{
    const userToken = useSelector((state) => state.authentication.userToken);
    if (userToken)
    {
        return (
            <Outlet />
        );
    }
    else
    {
        return <Navigate to="/login" />;
    }

}

export default UserProtectedRoute;
