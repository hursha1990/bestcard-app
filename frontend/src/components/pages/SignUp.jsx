import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../common/Button";
import { signup } from "../../services/authService";

const Signup = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {

    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      };

      await signup(payload);
      alert("Account created successfully");
      navigate("/login");

    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <main>
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            <br />

            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            <br />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <br />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            <br />

            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Retype the password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            <br />
            <br />

            <Button className="btn-primary" type="submit">
              Sign Up
            </Button>

            <p>
              Already have an account? <Link to="/login">Login here</Link>.
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Signup;
