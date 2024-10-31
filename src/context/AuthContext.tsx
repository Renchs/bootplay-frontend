import { createContext, useCallback, useEffect, useState } from "react";
import { album_api, user_api } from '../services/apiService';
import { UserModel } from "../models/UserModel";
import { Navigate } from "react-router-dom";



interface IAuthContext extends UserModel {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => void;
}

interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<Props> = ({children}) => {
    const [userData, setUserData] = useState<UserModel>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const data: UserModel = JSON.parse(localStorage.getItem('@Auth.Data') || "{}");
        if (data.id) {
            setIsAuthenticated(true);
            setUserData(data);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const resp = await user_api.post("/users/auth", { email, password });
        
        if (resp instanceof Error) {
            return resp.message;
        }

        user_api.defaults.headers.common.Authorization = `Basic ${resp.data.token}`;
        album_api.defaults.headers.common.Authorization = `Basic ${resp.data.token}`;

        const respUserInfo = await user_api.get(`/users/${resp.data.id}`);
        
        if (respUserInfo instanceof Error) {
            return respUserInfo.message;
        }
        setUserData(respUserInfo.data);
        setIsAuthenticated(true);
        localStorage.setItem('@Auth.Data', JSON.stringify(respUserInfo.data));
        localStorage.setItem('@Auth.Token', JSON.stringify(resp.data.token));
        
    }, []);
    
    const logout = useCallback(() => {
        localStorage.removeItem('@Auth.Data');
        localStorage.removeItem('@Auth.Token');
        setUserData(undefined);
        setIsAuthenticated(false);
        return <Navigate to="/" />
    }, []);
    
    
    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated ,...userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

