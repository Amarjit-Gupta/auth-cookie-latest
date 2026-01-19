import { createContext, useEffect, useState } from "react";


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const getAuthUserData = async () => {
        try {
            let result = await fetch("http://localhost:4000/auth/isAuth", {
                method: "get",
                credentials: "include"
            });

            let data = await result.json();
            console.log("userAuthData: ", data);
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }

        }
        catch (err) {
            console.log(err);
            setIsAuthenticated(false);
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }


    // if (loading) return <p>checking auth...</p>;


    useEffect(() => {
        getAuthUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, setUser, setIsAuthenticated,getAuthUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };