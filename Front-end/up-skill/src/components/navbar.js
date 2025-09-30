import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect} from "react";
export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if JWT token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // assuming you store JWT here on login
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="navbar flex justify-between items-center px-6 py-4">
      <h1 className="logo text-2xl font-bold text-white">UpSkill</h1>

      <ul className="nav-links flex gap-6 items-center">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""}>
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/certifications" className={({ isActive }) => isActive ? "active" : ""}>
            Certifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
            Contact
          </NavLink>
        </li>

        {/* Dynamic Login / Profile Button */}
        <li>
            {isLoggedIn ? (
          <NavLink
            to="/profile"
            className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Login
          </NavLink>
        )}
        </li>
      </ul>
    </nav>
  );
}
