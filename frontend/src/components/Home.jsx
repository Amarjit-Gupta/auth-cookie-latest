import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useContext } from "react";

const Home = () => {

    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated, user,setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            let result = await fetch("http://localhost:4000/auth/logout", {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let data = await result.json();
            if (data.success) {
                setIsAuthenticated(false);
                setUser(null);
                navigate("/login");
            }
            else {
                alert(data.message);
            }
            // console.log("log: ",data);
        }
        catch (err) {
            console.log("something went wrong...");
        }
    }
    return (
        <>
            <h1>Home page</h1>
            <h1>{isAuthenticated && <p>userName: {user?.name}</p>}</h1>
            <button onClick={handleLogout}>logout</button>
        </>
    );
};
export default Home;