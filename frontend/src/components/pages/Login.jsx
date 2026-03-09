import { Link } from "react-router-dom";
import Button from "../common/Button";

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <main>
          <h2>Login</h2>
          <form>
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" />
            <br />

            <label>Password:</label>
            <input type="password" placeholder="Enter your password" />
            <br />
            <br />

            <Link to="/landingA">
              <Button className="btn-primary">Login</Button>
            </Link>

            <p>
              Don't have an account? <a href="/signup">SignUp here</a>.
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
