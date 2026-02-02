import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { base_url } from "../URL";

const Navbar = () => {

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            let result = await fetch(`${base_url}/auth/logout`, {
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
        <div className="navbar">
            {isAuthenticated ?
                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><button onClick={handleLogout}>Logout</button><span>{user?.name}</span></li>
                </ul>
                :
                <ul>
                    <li><NavLink to={"/signup"}>Signup</NavLink></li>
                    <li><NavLink to={"/login"}>Login</NavLink></li>
                </ul>
            }
        </div>
    )
};
export default Navbar;