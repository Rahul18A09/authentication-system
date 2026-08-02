import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={{
                padding: 20,
                background: "#222",
            }}
        >
            <Link
                to="/"
                style={{
                    color: "white",
                    marginRight: 20,
                }}
            >
                Home
            </Link>

            {!token ? (
                <>
                    <Link
                        to="/login"
                        style={{
                            color: "white",
                            marginRight: 20,
                        }}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        style={{
                            color: "white",
                        }}
                    >
                        Register
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/dashboard"
                        style={{
                            color: "white",
                            marginRight: 20,
                        }}
                    >
                        Dashboard
                    </Link>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </>
            )}
        </nav>
    );
}

export default Navbar;