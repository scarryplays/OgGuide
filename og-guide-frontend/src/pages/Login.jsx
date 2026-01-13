import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css-pages/login.css";
import { useAuth } from "../store/auth";

export const Login = () => {
  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth();




  const [user, setUser] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Data:", user);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form response:", response);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }
      
        console.log("res from srver", responseData);
        storeTokenInLs(responseData.token);
  
        alert("Login successful!");
        setUser({
          emailOrUsername: "",
          password: "",
        });
        navigate("/");
      console.log("Received Token:", responseData.token);
      // const res_data = await response.json();
      // console.log("res from srver", res_data);
      // storeTokenInLs(res_data.token);

      // alert("Login successful!");
      // setUser({
      //   emailOrUsername: "",
      //   password: "",
      // });
      // navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Something went wrong!");
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="login-form-sec">
             
                <form onSubmit={handleSubmit} className="form-login">
                  <div className="main-heading">
                    <h1 className="main-heading-login">Login Form</h1>
                  </div>
                  <div>
                    <label htmlFor="emailOrUsername">Username or Email</label>
                    <input
                      type="text"
                      name="emailOrUsername" 
                      value={user.emailOrUsername}
                      onChange={handleInput}
                      placeholder="Enter username or email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <br />
                  <div className="btn-css">


                            <button type="submit" className="btn1">Log in</button>

                            <button type="button" onClick={() => navigate("/register")} className="btn2">Register</button>
                        </div>
                </form>
              </div>
            </div>
          
        </main>
      </section>
    </>
  );
};
