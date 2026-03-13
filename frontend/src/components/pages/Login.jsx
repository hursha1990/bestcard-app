import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../common/Button";
import { login } from "../../services/authService";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const validate = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } 
    else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // run validation first
    if (!validate()) return;

    try {
      const response = await login({
        email: email,
        password: password
      });

      // store token
      localStorage.setItem("token", response.data.token);

      // navigate to dashboard
      navigate("/landingA");

    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <main>
          <h2>Login</h2>

          <form onSubmit={handleLogin}>

            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <br />

            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <br /><br />

            <Button className="btn-primary" type="submit">
              Login
            </Button>

            <p>
              Don't have an account? <Link to="/signup">SignUp here</Link>.
            </p>

          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;