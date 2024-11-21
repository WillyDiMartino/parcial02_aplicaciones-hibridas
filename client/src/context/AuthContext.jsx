import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import  {jwtDecode}  from 'jwt-decode';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const auth = Cookies.get('token') || null;

    useEffect(() => {
        if (auth) {
            const decoded = jwtDecode(auth);
            setUser({
                name: decoded.user.name,
                id: decoded.user._id,
                username: decoded.user.username
            });
        }
    }, [auth]);

    const logoutUser = () => {
        setUser(null);
        Cookies.remove('token');
    }

    return (
        <AuthContext.Provider value={{ user, setUser, auth, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
