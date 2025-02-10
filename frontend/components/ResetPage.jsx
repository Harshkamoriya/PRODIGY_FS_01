import { useContext, useState } from "react"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import "../styles/reset.css"
import axios from "axios" // Add axios import
import { useNavigate } from "react-router-dom"


const ResetPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate();
  // const { resetURL } = useContext(AuthContext) // Make sure resetURL is valid
const api = localStorage.getItem('randomtoken')
console.log(api , "api")
  const getPasswordStrength = (password) => {
    const strengthChecks = {
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
    const strength = Object.values(strengthChecks).filter(Boolean).length
    return {
      score: strength,
      class: strength < 2 ? "weak" : strength < 4 ? "medium" : "strong",
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    if (getPasswordStrength(password).score < 3) {
      setError("Password is not strong enough");
      return;
    }
  
    try {
      // Retrieve the reset token from localStorage
      const api = localStorage.getItem("randomtoken");
      
      if (!api) {
        setError("Reset token is missing.");
        return;
      }
  
      // Construct the API endpoint
      const response = await axios.post(
        api, 
        { newPassword: password }, // ✅ Fix: Use `newPassword` instead of `password`
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Password reset successfully");
        alert("Password reset successfully");
        localStorage.removeItem("randomtoken"); // ✅ Remove token after reset
        setError("");
        setConfirmPassword("");
        setPassword("");
        navigate("/home")
      }
    } catch (error) {
      console.log("Reset Password Error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };
  

  const strength = getPasswordStrength(password)

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <span onClick={()=>{navigate("/home")}}> X</span>
        <h2>Reset Password</h2>
        <p className="description">Enter your new password below</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div
                    className={`strength-meter-fill ${strength.class}`}
                    style={{ width: `${(strength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <p>Password strength: {strength.score < 3 ? "Weak" : strength.score < 5 ? "Medium" : "Strong"}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>
        <p className="footer-text">Make sure your password is strong and unique</p>
      </div>
      <FaLock className="background-icon top-left" />
      <FaLock className="background-icon bottom-right" />
    </div>
  )
}

export default ResetPage
