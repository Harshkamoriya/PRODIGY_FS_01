import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/signup.css"

const Signup = () => {
  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleForgotPassword = () => {
    navigate("/forgetpassword")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const API = "http://localhost:5000/auth/signup"
    const requestBody = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    }

    try {
      const response = await axios.post(API, requestBody, {
        headers: {
          "content-type": "application/json",
        },
      })
      if (response.status === 201) {
        console.log("User registered successfully")
        name.current.value = ""
        email.current.value = ""
        password.current.value = ""
        navigate("/login")
      } else {
        console.log("Some error occurred")
      }
    } catch (error) {
      console.error("Error registering user", error.message)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <span className="cancel" onClick={()=>{navigate("/home")}}>X</span>
        <h2 className="signup-title">Create Account</h2>
        <div className="tabs">
          <button className="tab" onClick={handleLogin}>
            Login
          </button>
          <button className="tab" onClick={handleForgotPassword}>
            Forgot Password
          </button>
          <button className="tab active">Create Account</button>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">name</label>
          <input
            type="text"
            ref={name}
            id="name"
            placeholder="Enter your name"
            className="input-field"
            required
          />
          <label htmlFor="email">Email</label>
          <input type="email" ref={email} id="email" placeholder="Enter your email" className="input-field" required />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref={password}
            id="password"
            placeholder="Enter your password"
            className="input-field"
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup

