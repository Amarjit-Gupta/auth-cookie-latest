import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const Login = () => {

    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const { isAuthenticated, setIsAuthenticated,getAuthUserData } = useContext(AuthContext)

    if (isAuthenticated) return <Navigate to="/" />

    const handleChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(inputValue);
        try {
            let result = await fetch("http://localhost:4000/auth/login", {
                method: "post",
                credentials: "include",
                body: JSON.stringify(inputValue),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let data = await result.json();
            console.log(data);
            if (data.success) {
                alert(data.message);
                await getAuthUserData();
                setIsAuthenticated(true);
                navigate("/");
            }
            else {
                alert(data.message);
            }
        }
        catch (err) {
            console.log("Something went wrong...", err);
        }
    }


    return (
        <div className="main-container">
            <div className="signup-main">
                <h1 id="heading">Login Page</h1>
                <form onSubmit={handleSubmit}>

                    <div className="box">
                        <label htmlFor="">Email:</label>
                        <input type="email" name="email" value={inputValue.email} onChange={handleChange} />
                    </div>

                    <div className="box">
                        <label htmlFor="">Password:</label>
                        <input type="password" name="password" value={inputValue.password} onChange={handleChange} />
                    </div>

                    <div>
                        <input type="submit" value="Login" />
                    </div>

                </form>
            </div>

        </div>
    );
};
export default Login;