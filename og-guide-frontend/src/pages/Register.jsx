import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css-pages/register.css"
import { useAuth } from "../store/auth";

export const Register = () => {

    const navigate = useNavigate();


    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",

    });

    const { storeTokenInLs } = useAuth();


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log(`Updating ${name}: ${value}`);

        setUser({
            ...user,
            [name]: value,
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert("Form Submitted!");
        console.log("Form Submitted!", { ...user });

        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            console.log("response status: ", response.status);

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Registration failed");
            }
            console.log("res from srver", responseData);
            storeTokenInLs(responseData.token);


            alert("Registration successful!");
            setUser({
                name: "",
                email: "",
                phone: "",
                username: "",
                password: "",
            });
            navigate("/")

            console.log("Success:", responseData);
        } catch (error) {
            console.error("Register Error:", error.message);
            alert(`Error: ${error.message}`);
        }
    };





    return <>
        <section>
            <main className="main-section-css">
                <div className="section-registeration">
                    <h1 className="main-heading mb-3">Register form</h1>
                    <br />
                    <form onSubmit={handleSubmit} className="user-form">
                        <div className="form-div-label">
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                name="name"
                                placeholder="name"
                                id="name"
                                required
                                autoComplete="off"
                                value={user.name}
                                onChange={handleInput}
                            />

                        </div>
                        <div className="form-div-label">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                name="email"
                                placeholder="email"
                                id="email"
                                required
                                autoComplete="off"
                                value={user.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form-div-label">
                            <label htmlFor="phone">Phone</label>
                            <input type="number"
                                name="phone"
                                placeholder="phone"
                                id="phone"
                                required
                                autoComplete="off"
                                value={user.phone}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form-div-label">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                name="username"
                                placeholder="username"
                                id="username"
                                required
                                autoComplete="off"
                                value={user.username}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form-div-label">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                name="password"
                                placeholder="password"
                                id="password"
                                required
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                            />
                        </div>
                        <br />
                        <div className="btn-css">


                            <button type="submit" className="btn1">Register now</button>

                            <button type="button" onClick={() => navigate("/login")} className="btn2">Already register</button>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    </>
}
