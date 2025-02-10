import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Add axios import
import "../styles/login.css";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleButton1 = () => {
    navigate("/forgetpassword");
  };

  const handleButton2 = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.current.value || !password.current.value) {
      alert("Please fill in both fields.");
      return;
    }
  
    const API = "http://localhost:5000/auth/login";
    const requestBody = {
      email: email.current.value,
      password: password.current.value,
    };
  
    try {
      const response = await axios.post(API, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Axios automatically parses JSON, so access `data` directly
      const { token } = response.data; 
      
      if (response.status === 200) {
        console.log(token);
        localStorage.setItem("authtoken", token);
        email.current.value = "";
        password.current.value = "";
        navigate("/home");
      } else {
        alert("Username or password is incorrect");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <div className="tabs">
          <button className="tab active">Login</button>
          <button className="tab" type="button" onClick={handleButton1}>
            Forgot Password
          </button>
          <button className="tab" type="button" onClick={handleButton2}>
            Create Account
          </button>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            ref={email}
            id="email"
            placeholder="Enter your email"
            className="input-field"
          />
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            ref={password}
            id="password"
            placeholder="Enter your password"
            className="input-field"
          />
          <button type="button" onClick={togglePassword} className="showbtn">
            {showPassword ? "Hide" : "Show"}
          </button>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
