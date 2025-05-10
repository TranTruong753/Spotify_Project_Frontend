import { useEffect, useState, ReactNode } from "react";
import { useLocation, Navigate } from "react-router";
import { checkAndRefreshToken } from "@/utils/token";
import { User } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { logout } from "@/features/accounts/authSlice";

interface RequireAuthProps {
    children: ReactNode;
    user?: User | null;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, user }) => {

    const dispatch = useDispatch<AppDispatch>()
    
    const location = useLocation();
    const [isChecking, setIsChecking] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const verifyToken = async () => {
            const valid = await checkAndRefreshToken();
            setIsValid(valid);
            setIsChecking(false);
        };

        verifyToken();
    }, []);

    if (isChecking) {
        return <div>Checking authentication...</div>; // hoặc spinner
    }

    if (!isValid) {
        dispatch(logout())
        return <Navigate to="/login" state={{ from: location }} replace />;
        // return <Navigate to="/login"  replace />;
    }

    if(user){
        if(user.role.name === "Admin"){
            return <>{children}</>;
        }else {
             dispatch(logout())
            return <Navigate to="/" state={{ from: location }} replace />;
        }
    }

    return <>{children}</>;
};

export default RequireAuth;
