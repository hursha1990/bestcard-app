// import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import WhatIsBestCard from "./components/pages/WhatIsBestCard";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import LandingPageA from "./components/pages/LandingPageA";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <Router>
      <div className="NavBar">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-is-bestcard" element={<WhatIsBestCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landingA" element={<LandingPageA />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
