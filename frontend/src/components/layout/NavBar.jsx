import { useState } from "react";
import { Link } from "react-router-dom";
import "./layout.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navId = "primary-navigation";

  return (
    <nav className="navbar" aria-label="Main navigation">
      <h1 className="logo">BestCard</h1>

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
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
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

          <li>
            <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
          </li>

          <li>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
 