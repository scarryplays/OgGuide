import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";


export const Navbar = () => {
    const { isLoggedIn } = useAuth();
  console.log("login or not ", isLoggedIn);
    return (
        <>
            <header>
                <div className="nav-container">
                    <div className="logo-brand">
                        <NavLink to="/">OG GUIDE</NavLink>
                    </div>
                    <nav className="nav-css">
                        <ul>
                            <li className="li-home">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li className="li-about">
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li className="li-service">
                                <NavLink to="/service">Service</NavLink>
                            </li>
                            <li className="li-contact">
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                            {isLoggedIn ? (
                                <li className="li-logout">
                                    <NavLink to="/logout">Logout</NavLink>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/register" className="li-register"> Register </NavLink>
                                    </li>
                                </>
                            )}

                        </ul>
                    </nav>
                </div>
                <div className="theline"></div>
            </header>
        </>
    );
}