import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { token, logout } = useAuth();

    return (

        <nav
            style={{
                padding: 20,
                background: "#222"
            }}
        >

            <Link
                to="/"
                style={{
                    color: "white",
                    marginRight: 20
                }}
            >

                Home

            </Link>

            {
                !token && (

                    <>

                        <Link
                            to="/login"
                            style={{
                                color: "white",
                                marginRight: 20
                            }}
                        >

                            Login

                        </Link>

                        <Link
                            to="/register"
                            style={{
                                color: "white"
                            }}
                        >

                            Register

                        </Link>

                    </>

                )
            }

            {
                token && (

                    <button
                        onClick={logout}
                    >

                        Logout

                    </button>

                )
            }

        </nav>

    );

}

export default Navbar;