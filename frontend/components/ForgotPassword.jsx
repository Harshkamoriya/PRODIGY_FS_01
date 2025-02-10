import React, {  useState } from 'react';
// import "../styles/forget.css"
import  "../styles/forget.css"
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
// import { forgotPassword } from '../../backend/controllers/passwordController';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  // const {resetURL , setResetURL} = useContext(AuthContext);
// const [resetURL , setResetURL] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      // Assuming there's an API endpoint for forgot password
      const response = await fetch('http://localhost:5000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json(); // Extract JSON data

      console.log(response,"response")

      if (!response.ok) {
       
      
        setError(data.message);
      } else {
        console.log(data.resetURL, "resetURL"); // Log the reset URL
        console.log(response.resetURL ,"resetURl")

        console.log("a password reset link has been sent to your email")
        setMessage('A password reset link has been sent to your g email.');
        setEmail('');
        localStorage.setItem('randomtoken', data.resetURL)
      }
    } catch (err) {
        console.log("error occuring in the catch error")
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <div className="forgot-password">
      <span  className='cancel' onClick={()=>{navigate("/login")}}>X</span>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword ;
