import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./layout.css";
import { logout } from "../../services/authService";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navId = "primary-navigation";
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setOpen(false);
    navigate("/login");
  };

  const homeHref = isLoggedIn ? "/landingA" : "/";

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link to={homeHref} className="logo-link" aria-label="BestCard home">
        <h1 className="logo">BestCard</h1>
      </Link>

      <button
        className="hamburger"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        ☰
      </button>

      <div>
        <ul id={navId} className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <Link to={homeHref} onClick={() => setOpen(false)}>Home</Link>
          </li>

          <li>
            <Link to="/what-is-bestcard" onClick={() => setOpen(false)}>What Is BestCard</Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
              </li>

              <li>
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={handleLogout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
 
